import "./AboutLinks.css";

export const AboutLinks = () => {
  return (
    <>
      <div className="footer">
        <div className="page">
          <div className="footer-content-container">
            <div className="footer-content">
              <h2>Technologies Used</h2>
              <div className="footer-icons">
                <i class="fab fa-react fa-c"></i>
                <i class="fab fa-js fa-c"></i>
                <i class="fab fa-html5 fa-c"></i>
                <i class="fab fa-css3 fa-c"></i>
              </div>
            </div>
            <div className="footer-content">
              <h2>Contact</h2>
              <div className="footer-icons">
                <a href="https://github.com/thomasyuan478" target="blank">
                  <i class="fab fa-github-square fa-c"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/thomas-yuan-3b1581293/"
                  target="blank"
                >
                  <i class="fab fa-linkedin fa-c"></i>
                </a>
                <a href="mailto:thomasyuan478@gmail.com" target="blank">
                  <i class="fas fa-envelope-square fa-c"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
