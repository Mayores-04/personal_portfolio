export type Project = {
  Title: string;
  link: string;
  image: string;
  desc: string;
  tools?: string[];
};

export const projects: Project[] = [
  {
    Title: "Portfolio",
    link: "https://jakemayores.vercel.app",
    image: "https://jakemayores.vercel.app/images/Portfolio.PNG",
    desc: "Take a look at my very first personal portfolio, created during my first year of college, which highlights how my skills have grown.",
    tools: ["Figma", "Tailwind CSS", "Next.js"],
  },
  {
    Title: "EmailSender",
    link: "https://jm-email-sender.vercel.app",
    image: "https://jakemayores.vercel.app/images/EmailSender.png",
    desc: "Email Sender is a simple and powerful web app that lets you quickly create, customize, and send beautiful emails with ease. This Web Application is still developing",
    tools: ["Next.js", "Tailwind CSS", "MongoDB"],
  },
  {
    Title: "GoCarExpress",
    link: "https://go-car-express.vercel.app",
    image: "https://jakemayores.vercel.app/images/GoCarExpress.png",
    desc: "GoCar Express: to provide an outstanding car rental experience for individuals who appreciate quality, comfort, and convenience. With our one high-quality vehicle, we strive to ensure that every trip you take, whether it's a business meeting, a road trip, or a special occasion, is comfortable, safe, and enjoyable. Remember that this website is fully functional with Admin and have a client",
    tools: ["Next.js", "Tailwind CSS", "MongoDB"],
  },
  {
    Title: "ParkHubPic",
    link: "https://park-hub-website.vercel.app",
    image: "https://jakemayores.vercel.app/images/ParkHubPic.png",
    desc: "ParkHub: Your ultimate destination for hassle-free parking. Discover, reserve, and manage parking spaces with ease. This is not yet done.",
    tools: ["Next.js", "Tailwind CSS", "Figma"],
  },
  {
    Title: "MovieMunch",
    link: "https://github.com/Mayores-04/Movie_reservation",
    image: "https://jakemayores.vercel.app/images/MovieMunch.PNG",
    desc: "The MovieMunch System is an innovative desktop application designed to enhance the cinema experience. Book movie tickets and pre-order snacks. This is fully functional Application",
    tools: ["CSharp", "MongoDB", "Figma", "Bunifu", "Guna"],
  },
];
export default projects;
