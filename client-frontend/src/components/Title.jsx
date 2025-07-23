import React from 'react'

const Title = ({title,subTitle, align}) => {
  return (
    <div class={`flex flex-col justify-center items-center text-center ${align === "left" &&"md:items-start md:text-left"}`}>
        <h1 class=" text-4xl md:text-[40px] font-playfair">
          {title}
        </h1>
        <p class="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
          {subTitle}
        </p>
      </div>
  )
}

export default Title
