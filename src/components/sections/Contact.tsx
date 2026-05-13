function Contact() {
  return (
    <section
      id="contact"
      className="py-32"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        <p className="text-primary font-semibold tracking-widest">
          CONTACT
        </p>

        <h2 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
          Let’s build
          something impactful.
        </h2>

        <p className="mt-8 text-slate-400 text-lg leading-relaxed">
          Available for freelance projects,
          remote opportunities and AI-focused collaborations.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <a
            href="mailto:remowangai@gmail.com"
            className="
              bg-primary
              px-8
              py-4
              rounded-2xl
              font-medium
              hover:opacity-90
              transition
            "
          >
            Email Me
          </a>

          <a
            href="https://github.com/js-muc"
            target="_blank"
            className="
              border border-slate-700
              px-8
              py-4
              rounded-2xl
              font-medium
              hover:bg-slate-900
              transition
            "
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;