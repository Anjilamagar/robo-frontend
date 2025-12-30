import React from "react";
import { FaLightbulb, FaCheckCircle, FaUsers, FaLeaf, FaBullseye, FaEye } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* HERO SECTION */}
      <section className="bg-[var(--color-primary-dark)] text-[var(--color-text-light)] py-20 shadow-lg">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-4 tracking-wide">
            Who We Are
          </h1>

          <p className="text-lg max-w-2xl mx-auto opacity-90 leading-relaxed">
            Robotics is dedicated to delivering innovative, high-quality robotics accessories
            for enthusiasts and professionals. Our vision has been to make robotics
            accessible to everyone helping you build smarter, faster, and better.
          </p>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="py-20 bg-[var(--color-background-alt)] px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12 text-[var(--color-text-secondary)]">
            Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* Mission */}
            <div className="trigger bg-[var(--color-surface)] p-8 rounded-xl shadow-xl transition duration-300 border border-[var(--color-primary-light)]">
              <div className="flex justify-center mb-4">
                <FaBullseye size={40} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-text-secondary)]">Our Mission</h3>
              <p className="opacity-80">
                To provide innovative and reliable robotics accessories that empower
                builders, creators, and engineers across the globe.
              </p>
            </div>

            {/* Vision */}
            <div className="trigger bg-[var(--color-surface)] p-8 rounded-xl shadow-xl transition duration-300 border border-[var(--color-primary-light)]">
              <div className="flex justify-center mb-4">
                <FaEye size={40} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-[var(--color-text-secondary)]">Our Vision</h3>
              <p className="opacity-80">
                To become the leading global hub for robotics innovation, learning, and creativity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 px-6 bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold mb-14 text-[var(--color-primary-dark)]">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-4 gap-10">

            {/* Innovation */}
            <div className="trigger p-8 rounded-xl bg-[var(--color-primary)] text-[var(--color-text-light)] shadow-lg transition">
              <FaLightbulb size={40} className="mx-auto mb-4" />
              <h4 className="font-semibold text-xl mb-2">Innovation</h4>
              <p className="text-sm opacity-90">
                We embrace creativity and tech-driven progress.
              </p>
            </div>

            {/* Quality */}
            <div className="trigger p-8 rounded-xl bg-[var(--color-primary)] text-[var(--color-text-light)] shadow-lg transition">
              <FaCheckCircle size={40} className="mx-auto mb-4" />
              <h4 className="font-semibold text-xl mb-2">Quality</h4>
              <p className="text-sm opacity-90">
                Every product meets high standards of performance.
              </p>
            </div>

            {/* Customer Focus */}
            <div className="trigger p-8 rounded-xl bg-[var(--color-primary)] text-[var(--color-text-light)] shadow-lg transition">
              <FaUsers size={40} className="mx-auto mb-4" />
              <h4 className="font-semibold text-xl mb-2">Customer Focus</h4>
              <p className="text-sm opacity-90">
                Our customers remain at the heart of our decisions.
              </p>
            </div>

            {/* Sustainability */}
            <div className="trigger p-8 rounded-xl bg-[var(--color-primary)] text-[var(--color-text-light)] shadow-lg transition">
              <FaLeaf size={40} className="mx-auto mb-4" />
              <h4 className="font-semibold text-xl mb-2">Sustainability</h4>
              <p className="text-sm opacity-90">
                We commit to responsible and eco-friendly practices.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
