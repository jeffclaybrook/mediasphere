export type Chapter = {
 title: string
 time: number
}

export type Show = {
 id: string
 title: string
 description: string
 thumbnail: string
 video: string
 captions: string
 duration: string
 categories: string[]
 chapters: Chapter[]
 slides: string[]
 tags: string[]
}

export const shows: Show[] = [
 {
  id: "1",
  title: "A Tribute to Nursing: To the Community with Love",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-1.png",
  video: "/video-1.mp4",
  captions: "/captions.vtt",
  duration: "0:10",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "2",
  title: "COVID-19 Testing: What you should know",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-2.png",
  video: "/video-2.mp4",
  captions: "/captions.vtt",
  duration: "0:26",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   },
   {
    title: "Chapter 4",
    time: 15
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "3",
  title: "International Association of Latino Nurse Faculty is founded by UT Health San Antonio School of Nursing",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-3.png",
  video: "/video-3.mp4",
  captions: "/captions.vtt",
  duration: "0:10",
  categories: [
   "What's New",
   "Recommended",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "4",
  title: "Patient health and safety is our priority and passion",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-4.png",
  video: "/video-4.mp4",
  captions: "/captions.vtt",
  duration: "0:16",
  categories: [
   "What's New",
   "Most Popular",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   },
   {
    title: "Chapter 4",
    time: 12
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "5",
  title: "UT Health San Antonio alumna tells how her nursing education and mentor relationships lead to her career in academic nursing",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-5.png",
  video: "/video-5.mp4",
  captions: "/captions.vtt",
  duration: "0:10",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "6",
  title: "President's Gala 2018: A tribute to courage in the fight against cancer",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-6.png",
  video: "/video-6.mp4",
  captions: "/captions.vtt",
  duration: "0:14",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   },
   {
    title: "Chapter 4",
    time: 11
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "7",
  title: "Significant Operating Changes During the COVID-19 Pandemic",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-7.png",
  video: "/video-7.mp4",
  captions: "/captions.vtt",
  duration: "0:11",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 },
 {
  id: "8",
  title: "The Opioid Crisis in America: What you need to know",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nostrum beatae asperiores sapiente aspernatur doloremque, nesciunt debitis. Assumenda obcaecati consectetur, iste atque temporibus ipsum dignissimos optio voluptatibus quam nobis exercitationem vel nemo laborum blanditiis voluptates nesciunt dicta quod odit tempora.",
  thumbnail: "/thumbnail-8.png",
  video: "/video-8.mp4",
  captions: "/captions.vtt",
  duration: "0:12",
  categories: [
   "What's New",
   "Most Popular",
   "Recommended",
   "Professional Development"
  ],
  chapters: [
   {
    title: "Chapter 1",
    time: 0
   },
   {
    title: "Chapter 2",
    time: 4
   },
   {
    title: "Chapter 3",
    time: 7
   }
  ],
  slides: [
   "/slide-1.png",
   "/slide-2.png",
   "/slide-3.png",
   "/slide-4.png"
  ],
  tags: [
   "#Sphere",
   "#Media",
   "#Demonstration",
   "#Multimedia",
   "#Content",
   "#Engagement",
   "#Organization"
  ]
 }
]