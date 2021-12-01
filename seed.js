const mongoose = require("mongoose");
const { Product } = require("./models/product")
const products = [
    {
        name:"Smart Tv",
        img:"https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg",
        price:1200,
        desc:"A smarter way to watch. As the centerpiece in your home, Samsung Smart TVs are dedicated to giving you access to a world of content beyond streaming so you can schedule recordings, search and game all while connecting to more devices across your home."
    },
    {
        name:"Hp Computers",
        img:"https://i.pcmag.com/imagery/roundups/03yEDeTzPo1WxOu5QGWq9Zq-16..1598476026.jpg",
        price:1200,
        desc:"The HP All-in-One PC blends the power of a desktop with the beauty of a slim, three-sided borderless display for one dependable device designed to grow with you. With easy upgrades[1] in three simple steps, you can feel confident your tech will stay up-to-date."
    },
    {
        name:"Speakers ",
        img:"https://images.idgesg.net/images/article/2020/06/fluance-ai60-opener-100848062-large.3x2.jpg",
        price:950,
        desc:"This lightweight, stylish and compact player offers crisp and clear sound. High Sound Quality. These magnetically shielding speakers take your music-listening experience to the next level. Auto Shut Off. These speakers automatically shut-off when you switch off your desktop or laptop."
    },
]

const seedData = async () => {
   await Product.insertMany(products);
   console.log("DataBase seeded");
}