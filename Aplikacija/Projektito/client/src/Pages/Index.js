import React, { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import about1 from "../assets/img/about/1.jpg";
import about2 from "../assets/img/about/2.jpg";
import about3 from "../assets/img/about/3.jpg";
import about4 from "../assets/img/about/4.jpg";

import logo1 from "../assets/img/logos/microsoft.jpg";
import logo2 from "../assets/img/logos/google.jpg";
import logo3 from "../assets/img/logos/meta.jpg";
import logo4 from "../assets/img/logos/amd.jpg";

import userPic from "../assets/img/user.jpg";

const Index = () => {
  const { ready, user } = useContext(UserContext);
  const token = `Bearer ${Cookies.get("Token")}`;

  useEffect(() => {
    let connection;
    if (ready && user.role === "Vozac") {
      connection = new HubConnectionBuilder()
        .withUrl(
          `http://localhost:5026/notificationHub?username=${user.korisnickoIme}`,
          {
            accessTokenFactory: () => token,
          }
        )
        .build();

      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            toast(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              css: `
              background-color: white;
              `,
            });
          });
        })
        .catch((error) => {});
    }
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [ready]);

  return (
    <div>
      <header className="masthead">
        <div className="container pb-80 ">
          <div className="">
            <div className="masthead-subheading ">Dobrodošli</div>
            <div className="masthead-heading text-uppercase ">RoadRunner</div>
            <button
              className="btn btn-prim btn-xl text-uppercase"
              href="#services"
            >
              Saznaj više
            </button>
          </div>
        </div>
      </header>
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Servisi</h2>
            <h3 className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <svg
                  className="fa fa-circle fa-stack-2x text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                </svg>
                <svg
                  className="fa fa-truck fa-stack-1x fa-inverse"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </span>
              <h4 className="my-3">E-Commerce</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Responsive Design</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Web Security</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">
              Saznaj više o nama
            </h2>
            <h3 className="section-subheading text-muted">
              Mali pogled u razvoj aplikacije
            </h3>
          </div>
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about1}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Maj 2023</h4>
                  <h4 className="subheading">Ideja aplikacije</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Ideja ove aplikacije kreirana je nakon{" "}
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about2}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>April 2023</h4>
                  <h4 className="subheading">Projektovanje aplikacije</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about3}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Maj 2024</h4>
                  <h4 className="subheading">Izrada aplikacije</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img
                  className="rounded-circle img-fluid"
                  src={about4}
                  alt="..."
                />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>July 2020</h4>
                  <h4 className="subheading">Finalizacija aplikacije</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt ut voluptatum eius sapiente, totam reiciendis
                    temporibus qui quibusdam, recusandae sit vero unde, sed,
                    incidunt et ea quo dolore laudantium consectetur!
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  Budite
                  <br />
                  Deo
                  <br />
                  Naše Priče!
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="page-section bg-light" id="team">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
            <h3 className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={userPic}
                  alt="..."
                />
                <h4>Milan Miljkovic</h4>
                <p className="text-muted">Lead Designer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Twitter Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="white"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Facebook Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                    fill="white"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={userPic}
                  alt="..."
                />
                <h4>Božidar Mitić</h4>
                <p className="text-muted">Lead Designer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Twitter Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="white"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Facebook Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                    fill="white"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-member">
                <img
                  className="mx-auto rounded-circle"
                  src={userPic}
                  alt="..."
                />
                <h4>Nenad Pavlović</h4>
                <p className="text-muted">Lead Designer</p>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Twitter Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="white"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand Facebook Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                    fill="white"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Parveen Anand LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-5" id="sponsors">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={logo1}
                  alt="..."
                  aria-label="Microsoft Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={logo2}
                  alt="..."
                  aria-label="Google Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={logo3}
                  alt="..."
                  aria-label="Meta Logo"
                />
              </a>
            </div>
            <div className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto"
                  src={logo4}
                  alt="..."
                  aria-label="AMD Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">
              Kontaktirajte Nas
            </h2>
          </div>
          <form id="contactForm" data-sb-form-api-token="API_TOKEN">
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Your Name *"
                    data-sb-validations="required"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Your Email *"
                    data-sb-validations="required,email"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email is not valid.
                  </div>
                </div>
                <div className="form-group mb-md-0">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="Your Phone *"
                    data-sb-validations="required"
                  />
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    A phone number is required.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-textarea mb-md-0">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Your Message *"
                    data-sb-validations="required"
                  ></textarea>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    A message is required.
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none" id="submitSuccessMessage">
              <div className="text-center text-white mb-3">
                <div className="fw-bolder">Form submission successful!</div>
                To activate this form, sign up at
                <br />
                <a href="https://startbootstrap.com/solution/contact-forms">
                  https://startbootstrap.com/solution/contact-forms
                </a>
              </div>
            </div>
            <div className="d-none" id="submitErrorMessage">
              <div className="text-center text-danger mb-3">
                Error sending message!
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary btn-xl text-uppercase disabled"
                id="submitButton"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Index;
