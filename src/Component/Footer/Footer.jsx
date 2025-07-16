import React from 'react';
import logoImg from '../../assets/vaccine logo.jpg'
import { useLanguage } from '../../Context/LanguageContext';

const Footer = () => {
    const {t} = useLanguage();
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
                <img src={logoImg} alt="Vaxin Logo" className="h-10 w-12 rounded-full" />
               
                <p>
                   <span className='text-blue-700'>V</span>axin E-Commerce website
                    <br />
                   
                    {t.footerText}
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">{t. footerService}</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">{t. footerCompany}</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">{t. footerLegal}</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;