import React from "react";
import "../Cascading-Style-Sheets/Footer.css";
import facebook from "../assets/logo-facebook.svg";
import twitter from "../assets/logo-twitter.svg";
import instagram from "../assets/logo-instagram.svg";
import linkedin from "../assets/logo-linkedin.svg";

export default function Footer() {
  return (
    <>
      <footer className="section section-footer">
        <div className="cols">
          <h3 className="heading-primary">MET NFT</h3>
          <p className="footer-text">
            The world's first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTS). Buy, sell, and discover
            exclusive digital items.
          </p>
        </div>
        <div className="cols">
          <h3 className="heading-primary">Resources</h3>
          <ul className="footer-ul">
            <a href="#" className="footer-links">
              Help Center
            </a>
            <a href="#" className="footer-links">
              Platform Status
            </a>
            <a href="#" className="footer-links">
              Partners
            </a>
            <a href="#" className="footer-links">
              Gas-Free Marketplace
            </a>
            <a href="#" className="footer-links">
              Blog
            </a>
          </ul>
        </div>
        <div className="cols">
          <h3 className="heading-primary">Company</h3>
          <ul className="footer-ul">
            <a href="#" className="footer-links">
              Our Team
            </a>
            <a href="#" className="footer-links">
              About Us
            </a>
            <a href="#" className="footer-links">
              Contact Us
            </a>
            <a href="#" className="footer-links">
              Carrer
            </a>
          </ul>
        </div>
        <div className="cols">
          <h3 className="heading-primary">Contact</h3>
          <a href="#" className="footer-links">
            Chennai, Tamilnadu
          </a>
          <div class="footer-logos">
            <a href="#">
              <img className="logo" src={facebook} alt="logo" />
            </a>
            <a href="#">
              <img className="logo" src={twitter} alt="logo" />
            </a>
            <a href="#">
              <img className="logo" src={instagram} alt="logo" />
            </a>
            <a href="#">
              <img className="logo" src={linkedin} alt="logo" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
