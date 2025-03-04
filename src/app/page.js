import React from "react";
import homeImg from "../assets/home.webp";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Work Manager | Home'
};

export default function Home() {
  
  return (
    <div className="bg-[#0D0A10] text-white min-h-screen ">
      {/* Welcome Banner */}
      <section className="flex flex-col shadow-[0px_19px_20px_2px_rgba(128,0,255,0.4)] items-center justify-center h-screen text-center p-10">

        <h1 className="text-5xl font-bold">Welcome to Work Manager</h1>
        <p className="mt-4 text-lg">Organize your tasks efficiently and boost your productivity.</p>
        <Image 
          src={homeImg} 
          alt="Welcome" 
          className="mt-20 w-full sm:w-10/12 md:w-8/12  lg:w-6/12 transition duration-700 rounded-xl hover:scale-95 shadow-[0px_5px_20px_2px_rgba(128,0,255,0.4)]"
        />
      </section>

      {/* Feature Section */}
      <section className="p-10">
        <h2 className="text-4xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white text-violet-800 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold">Task Management</h3>
            <p>Effortlessly add, edit, and delete tasks with an intuitive interface.</p>
          </div>
          <div className="p-6 bg-white text-violet-800 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold">Status Tracking</h3>
            <p>Keep track of your pending and completed tasks in real-time.</p>
          </div>
          <div className="p-6 bg-white text-violet-800 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold">Reminders</h3>
            <p>Never miss a deadline with built-in task reminders.</p>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="flex flex-col items-center justify-center text-center p-10 bg-transparent text-violet-800">
        <h2 className="text-4xl font-bold">Get Started Today!</h2>
        <p className="mt-4 text-lg">Sign up and start managing your tasks efficiently.</p>
        <Link href='/signup'>
          <button className="mt-6 px-6 py-3 bg-violet-700 text-white text-lg font-semibold rounded-lg hover:bg-violet-600">Sign Up</button>
        </Link>
      </section>

      {/* Testimonial Section */}
      <section className="p-10 shadow-[0px_19px_20px_2px_rgba(128,0,255,0.4)]">
        <h2 className="text-4xl font-bold text-center">What Our Users Say</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-6">
          <div className="p-6 bg-white text-violet-800 rounded-lg shadow-lg hover:shadow-xl">
            <p>"This app has transformed how I manage my work. Highly recommend!"</p>
            <h3 className="font-semibold mt-2">- Alex Johnson</h3>
          </div>
          <div className="p-6 bg-white text-violet-800 rounded-lg shadow-lg hover:shadow-xl">
            <p>"Super intuitive and easy to use. I love the reminder feature!"</p>
            <h3 className="font-semibold mt-2">- Sarah Lee</h3>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="p-10 pb-20 bg-transparent text-violet-800">
        <h2 className="text-4xl font-bold text-center">Contact Us</h2>
        <form className="mt-6 max-w-lg mx-auto flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 border border-violet-500 rounded-lg focus:ring-2 focus:ring-violet-700" />
          <input type="email" placeholder="Your Email" className="p-3 border border-violet-500 rounded-lg focus:ring-2 focus:ring-violet-700" />
          <textarea placeholder="Your Message" className="p-3 border border-violet-500 rounded-lg focus:ring-2 focus:ring-violet-700" rows="4"></textarea>
          <button type="submit" className="px-6 py-3 bg-violet-700 text-white text-lg font-semibold rounded-lg hover:bg-violet-600">Send Message</button>
        </form>
      </section>
    </div>
  );
}
