import { ShieldCheck, Clock3, Users } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-100 py-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose MediQueue?
          </h2>

          <p className="mt-4 text-gray-600">
            Smart tutor booking with modern learning support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <ShieldCheck
              size={60}
              className="mx-auto text-blue-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Trusted Tutors
            </h3>

            <p className="text-gray-600 mt-3">
              Learn from verified and experienced tutors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <Clock3
              size={60}
              className="mx-auto text-cyan-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Flexible Schedule
            </h3>

            <p className="text-gray-600 mt-3">
              Book sessions based on your preferred time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <Users
              size={60}
              className="mx-auto text-indigo-600"
            />

            <h3 className="text-2xl font-bold mt-5">
              Easy Learning
            </h3>

            <p className="text-gray-600 mt-3">
              Smooth and organized online tutoring experience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;