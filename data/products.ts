export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  availability: "In stock" | "Out of stock";
  image?: string;
  isNew?: boolean;

  specifications?: {
    publisher: string;
    isbn: string;
    publicationDate: string;
    format: "Paperback" | "Hardcover" | "eBook";
    language: string;
    pages: number;
  };
};


export const products: Book[] = [
  {
    id: "wintergirls",
    title: "Wintergirls",
    author: "Laurie Halse Anderson",
    price: 22.99,
    category: "Mental Health Fiction",
    description: "A stark, hauntingly written portrait of a teenage girl caught in the dangerous emotional and physical grip of anorexia and the ghost of her former best friend.",
    availability: "In stock",
     image: "/images/wintergirls.jpg",

    specifications: {
    publisher: "Viking Books for Young Readers",
    isbn: "9780670011100",
    publicationDate: "March 19, 2009",
    format: "Hardcover",
    language: "English",
    pages: 304,
  }
  },
  {
    id: "speak",
    title: "Speak",
    author: "Laurie Halse Anderson",
    price: 22.0,
    category: "Young Adult (YA) | Trauma Recovery",
    description: "A novel about Melinda, a high school freshman who becomes an outcast after calling the police on a summer party, retreating into selective mutism to mask a traumatic assault.",
    availability: "In stock",
    image: "/images/speak.jpg",

    specifications: {
    publisher: "Farrar, Straus and Giroux",
    isbn: "9780374311254",
    publicationDate: "January 15, 2019",
    format: "Hardcover",
    language: "English",
    pages: 304,
  }
  },
  {
    id: "how-it-feels-to-float",
    title: "How It Feels to Float",
    author: "Helena Fox",
    price: 12.99,
    category: "Young Adult (YA) | Psychological Fiction",
    description: "A highly lyrical, experimental dive into the mind of Biz, a teenager dealing with dissociation, intergenerational mental illness, and the lingering presence of her deceased father.",
    availability: "In stock",
    image: "/images/how it feels to float.jpg",


    specifications: {
    publisher: "Dial Books",
    isbn: "9780525554295",
    publicationDate: "May 7, 2019",
    format: "Paperback",
    language: "English",
    pages: 304,
  }
  },
  {
    id: "its-kind-of-a-funny-story",
    title: "It is Kind of a Funny Story",
    author: "Ned Vizzini",
    price: 12.99,
    category: "Mental Health Fiction",
    description: "Stressed by academic pressure and intense depression, teenager Craig Gilner checks himself into a psychiatric clinic, only to find himself placed in the adult ward where he discovers unexpected community and hope.",
    availability: "In stock",
    image: "/images/funny story.jpg",


    specifications: {
    publisher: "Disney Hyperion",
    isbn: "9780786851973",
    publicationDate: "May 1, 2007",
    format: "Paperback",
    language: "English",
    pages: 304,

  }
  },
  {
    id: "girl-in-pieces",
    title: "Girl In Pieces",
    author: "Kathleen Glasgow",
    price: 15.99,
    category: "Mental Health Fiction",
    description: "Follows 17-year-old Charlie Davis as she leaves a psychiatric facility and struggles to rebuild a life in Arizona, navigating severe trauma and self-harm recovery through the healing outlet of art.",
    availability: "In stock",
    image: "/images/pieces-of-girl.jpg",
    isNew: true,

    specifications: {
    publisher: "Ember",
    isbn: "9781101934715",
    publicationDate: "August 30, 2016",
    format: "Paperback",
    language: "English",
    pages: 448,
  }
  },
  {
    id: "the-glass-girl",
    title: "The Glass Girl",
    author: "Kathleen Glasgow",
    price: 21.99,
    category: "Young Adult (YA) | Contemporary Realistic Fiction",
    description: "Centers on 15-year-old Bella as she enters an inpatient rehabilitation facility to address severe teenage alcoholism, family trauma, and the pressure cooker of modern expectations.",
    availability: "In stock",
    image: "/images/girl-of-glass.jpg",

    specifications: {
    publisher: "Canongate Books",
    isbn: "9780525708087",
    publicationDate: "October 1, 2024",
    format: "Hardcover",
    language: "English",
    pages: 304,
  }
  },
  {
    id: "how-to-make-friends-with-the-dark",
    title: "How to Make Friends with the Dark",
    author: "Kathleen Glasgow",
    price: 24.99,
    category: "Young Adult (YA) Fiction",
    description: "Chronicles the raw, devastating journey of 16-year-old Tiger Tolliver as she navigates absolute grief and the complex foster care system following her mother's sudden death.",
    availability: "In stock",
    image: "/images/how to make friends.jpg",
    

    specifications: {
    publisher: "Delacorte Press",
    isbn: "9781101934753",
    publicationDate: "April 9, 2019",
    format: "Hardcover",
    language: "English",
    pages: 304,
  }
  },
  {
    id: "youd-be-home-now",
    title: "You'd Be Home Now",
    author: "Kathleen Glasgow",
    price: 20.99,
    category: "Young Adult (YA) | Family Drama",
    description: "Explores the life of Emmy, a 'quiet' sister trying to establish her own identity in a small town while living in the immediate shadow of her older brother's public struggle with addiction.",
    availability: "In stock",
    image: "/images/home-now.jpg",

    specifications: {
    publisher: "Delacorte Press",
    isbn: "9780525708049",
    publicationDate: "September 28, 2021",
    format: "Hardcover",
    language: "English",
    pages: 304,
  }
  },
  
   {
    id: "twisted-love",
    title: "Twisted Love",
    author: "Ana Huang",
    price: 17.99,
    category: "New Adult Romance",
    description: "Introduces Ava Chen, a free-spirited student, and Alex Volkov, her brother's cold, billionaire best friend who is driven by a hidden past, leading to an intense romance.",
    availability: "In stock",
    image: "/images/twisted-love copy.jpg",

    specifications: {
    publisher: "Bloom Books",
    isbn: "9781728274867",
    publicationDate: "April 21, 2021",
    format: "Paperback",
    language: "English",
    pages: 343,
  }
  },


  {
    id: "twisted-games",
    title: "Twisted Games",
    author: "Ana Huang",
    price: 17.99,
    category: "New Adult Romance | Contemporary Royal Romance",
    description: "Follows Princess Bridget von Ascheberg as she unexpectedly ascends toward the throne while navigating a forbidden, tension-filled relationship with her elite, stoic bodyguard, Rhys Larsen.",
    availability: "In stock",
    image: "/images/twisted-games copy.jpg",

    specifications: {
    publisher: "Bloom Books",
    isbn: "9781728274874",
    publicationDate: "July 29, 2021",
    format: "Paperback",
    language: "English",
    pages: 443,
  }
  },



  {
    id: "twisted-hate",
    title: "Twisted Hate",
    author: "Ana Huang",
    price: 17.99,
    category: "New Adult Romance | Enemies to Lovers Romance",
    description: "Centers on Jules Ambrose, an aspiring lawyer, and Josh Chen, a cocky medical resident, who engage in a volatile enemies-with-benefits arrangement that quickly blurs into genuine obsession.",
    availability: "In stock",
    image: "/images/twisted-hate.jpg",

    specifications: {
    publisher: "Bloom Books",
    isbn: "9781728274881",
    publicationDate: "January 27, 2022",
    format: "Paperback",
    language: "English",
    pages: 500,
  }
  },


  {
    id: "twisted-lies",
    title: "Twisted Lies",
    author: "Ana Huang",
    price: 17.99,
    category: "New Adult Romance | Contemporary Billionaire Romance",
    description: "Focuses on introverted fashion blogger Stella Alonso and tech billionaire Christian Harper, who enter into a strategic fake-dating arrangement layered with secrets, obsession, and dangerous stakes.",
    availability: "In stock",
    image: "/images/twisted-lies copy.png",

    specifications: {
    publisher: "Bloom Books",
    isbn: "9781728274898",
    publicationDate: "June 30, 2022",
    format: "Paperback",
    language: "English",
    pages: 500,
  }
  },









  {
  id: "cozy-reader-bundle",
  title: "The Cozy Reader Bundle",
  author: "Marginalia's Curated Collections",
  price: 35.00,
  category: "Bundles",
  description:
  "A thoughtfully curated reading bundle with a book, bookmark, and cosy reading accessories.",
  availability: "In stock",
  image:"/images/book-bundles.jpg",
  isNew: true,
  },
  {
  id: "annotators-bundle",
  title: "The Annotator's Bundle",
  author: "Marginalia's Curated Collections",
  price: 24.00,
  category: "Bundles",
  description:
  "A bookish bundle for readers who love highlighting passages, taking notes, and collecting favourite quotes.",
  availability: "In stock",
  image:"/images/annotators-bundles.jpg",
  },
  {
  id: "gift-your-friend-bundle",
  title: "Friendship Bundle",
  author: "Marginalia's Curated Collections",
  price: 29.00,
  category: "Bundles",
  description:
  "A bundle made for your book-lover friend.",
  availability: "In stock",
  image:"/images/friend-bundles.jpg",
  },
  {
  id: "gift-your-lover-bundle",
  title: "Lover's Bundle",
  author: "Marginalia's Curated Collections",
  price: 30.00,
  category: "Bundles",
  description:
  "The perfect gift for your spouse who is a lover of books.",
  availability: "In stock",
  image:"/images/gift-your-lover-bundles.jpg",
  },
  {








  id: "floral-book-sleeve",
  title: "Floral Book Sleeve",
  author: "Marginalia's Essentials",
  price: 14.00,
  category: "Accessories",
  description:
  "A soft protective sleeve for carrying your current read wherever the day takes you.",
  availability: "In stock",
  image:"/images/floral-book-protectors.jpg",
  },
  {
  id: "the-handmade-bookmark",
  title: "Handmade Bookmark",
  author: "Marginalia's Essentials",
  price: 9.00,
  category: "Accessories",
  description:
  "A handmade bookmark.",
  availability: "In stock",
  image:"/images/handmade-bookmark.jpg",
  isNew: true,
  },
  {
  id: "floral-bookmarks",
  title: "Floral Bookmarks",
  author: "Marginalia's Essentials",
  price: 6.00,
  category: "Accessories",
  description:
  "A set of decorative bookmarks.",
  availability: "In stock",
  image:"/images/floral-bookmarks.jpg",
  },
  {
  id: "readers-journal-kit",
  title: "Reader's Journal Kit",
  author: "Marginalia's Essentials",
  price: 18.00,
  category: "Accessories",
  description:
  "A journal and reading stationery kit for recording favourite quotes, thoughts, and finished reads.",
  availability: "In stock",
  image:"/images/velvet-book-journal.jpg",
  },


];

