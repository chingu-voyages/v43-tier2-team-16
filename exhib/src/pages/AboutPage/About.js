import '../AboutPage/about.css'
import networking_img from '../../../src/static/images/networking.jpg'
import ideas_img from '../../../src/static/images/ideas.jpg'
import chat_img from '../../../src/static/images/chat.jpg'

function About() {
  return (
    <section className="container mx-auto">
      <div>
        <h1 className="text-center pt-5">About</h1>
      </div>
    
      <section className="row mt-5">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-lg-center">
          <h2 className="mb-0">Share your Projects</h2>
          <p className="my-3 my-lg-0">Exhib is the perfect platform for developers to share their projects with a global audience. By uploading your projects, you can showcase your skills and creativity to the world, and gain exposure for your work. Our user-friendly upload interface makes it easy for you to share your projects in a matter of minutes. Simply provide a description of your project, upload any relevant files or images, and hit "Upload Project". Once your project is live on the site, visitors can view it and provide valuable feedback.</p>
        </div>
        <div className="col-12 col-lg-6">
          <div className="round-img-wrapper">
            <img className="img-fluid w-100" src={ideas_img} alt="Lightbulb" />
          </div>
        </div>
      </section>

      <section className="row mt-5">
        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <div className="round-img-wrapper">
            <img className="img-fluid w-100" src={networking_img} alt="Networking" />
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-lg-center order-1 order-lg-2">
          <h2 className="mb-0">Connect with Other Developers</h2>
          <p className="my-3 my-lg-0">Exhib also provides a great opportunity to connect with other developers in the community. You can discover other like-minded developers and get in touch with them through the contact info they provide. Our platform encourages networking and collaboration, allowing you to build relationships with other developers and expand your knowledge and skills.</p>
        </div>
      </section>

      <section className="row mt-5">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-lg-center">
          <h2 className="mb-0">Get Noticed</h2>
          <p className="my-3 my-lg-0">With so many projects being uploaded on the web daily, it can be hard to get noticed. But at Exhib, we help you stand out from the crowd. Our gallery-like project showcase, promotes your work making it easier and more accessible for anyone to view them.</p>
        </div>
        <div className="col-12 col-lg-6">
          <div className="round-img-wrapper">
            <img className="img-fluid w-100" src={chat_img} alt="Chat" />
          </div>
        </div>
      </section>
    </section>
  );
}

export default About;
