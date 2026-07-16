import '../css/blewer.css';

const Blewer = () => {
  return (
    <main className="blewer-page">
      <section className="blewer-hero">
        <h1>Blewer Food Center</h1>
        <p>Serving families in Gordon County with love and nourishment.</p>
      </section>

      <section className="blewer-content">
        <div className="blewer-info">
          <h2>Our Mission</h2>
          <p>
            The Blewer Food Center Pantry, located in Calhoun, GA, is dedicated to addressing food insecurity by offering emergency food assistance to individuals and families in need. Our mission is to ensure that every household has access to quality food items that meet their basic nutritional needs.
          </p>
          <p>
            We work tirelessly to provide a warm and supportive environment where those experiencing hunger can find the nourishment they require. Whether you're in immediate need or facing ongoing challenges, our food pantry is here to help you and your family thrive.
          </p>
        </div>

        <div className="blewer-contact">
          <h2>Contact</h2>
          <p><strong>Judy Craig, Director</strong></p>
          <p><a href="tel:7062632570">(706) 263-2570</a></p>
          <p><a href="mailto:blewerfoodcenter@gmail.com">blewerfoodcenter@gmail.com</a></p>
          <p className="blewer-address">373 Morrow Rd SE, Calhoun, GA 30701</p>
        </div>
      </section>
    </main>
  );
};

export default Blewer;
