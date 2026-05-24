const steps = [
  {
    id: 1,
    title: "Find Tutor",
    desc: "Browse tutors based on subjects and schedule.",
  },

  {
    id: 2,
    title: "Book Session",
    desc: "Choose your preferred slot and confirm booking.",
  },

  {
    id: 3,
    title: "Start Learning",
    desc: "Join sessions and improve your skills easily.",
  },
];

const Work = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold">
          How It Works
        </h2>

        <p className="mt-4 text-gray-600">
          Start learning in just a few easy steps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white border p-10 rounded-3xl text-center shadow-md hover:shadow-xl transition"
          >
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              {step.id}
            </div>

            <h3 className="text-2xl font-bold mt-6">
              {step.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {step.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Work;