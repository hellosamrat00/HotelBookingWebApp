export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchCities = req.user.recentSearchCities;
    res.json({ success: true, role, recentSearchCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCities } = req.body;
    const user = req.user; // already available, don’t use await

    if (!recentSearchCities || typeof recentSearchCities !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid city name" });
    }

    const index = user.recentSearchCities.indexOf(recentSearchCities);
    if (index !== -1) {
      user.recentSearchCities.splice(index, 1);
    }

    if (user.recentSearchCities.length >= 3) {
      user.recentSearchCities.shift();
    }

    user.recentSearchCities.push(recentSearchCities);
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "City stored",
        data: user.recentSearchCities,
      });
  } catch (error) {
    console.error("Error storing city:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
