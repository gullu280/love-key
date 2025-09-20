// App.js
// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { FaWhatsapp, FaFacebookF, FaTwitter, FaShareAlt } from "react-icons/fa";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedName = urlParams.get("name") || "Gulam Mustafa";

  const [step, setStep] = useState("question");
  const [name, setName] = useState(sharedName); // User's name to show in app
  const [gifSad, setGifSad] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [wrongTry, setWrongTry] = useState(false);
  const [hearts, setHearts] = useState([0, 1, 2]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [customName, setCustomName] = useState(name); // User input for share

  useEffect(() => {
    if (step === "unlock") setHearts([0, 1, 2].sort(() => Math.random() - 0.5));
  }, [step]);

  const correctIndex = 2;

  const handleHeartClick = (index) => {
    if (index === correctIndex) {
      setUnlocked(true);
      setWrongTry(false);
      setTimeout(() => {
        setStep("question");
        setUnlocked(false);
      }, 10000);
    } else {
      setWrongTry(true);
      setTimeout(() => setWrongTry(false), 500);
    }
  };

  const handleNoClick = () => {
    setGifSad(true);
    setTimeout(() => setGifSad(false), 5000);
  };

  const handleShare = () => setShowShareModal(true);

  const copyLink = () => {
    const shareUrl = `${window.location.origin}?name=${encodeURIComponent(customName)}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied! Share it on Instagram ❤️");
  };

  const shareUrl = `${window.location.origin}?name=${encodeURIComponent(customName)}`;

  const handleSaveName = () => {
    if (customName.trim() === "") {
      alert("Please enter your name to share!");
      return;
    }
    setName(customName); // Update name for sharing
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center position-relative"
      style={{
        background: step === "unlock" ? "#FFC0CB" : "#FFE4E1",
        transition: "background 1s ease",
        overflow: "hidden",
      }}
    >
      {unlocked && <Confetti />}

      {/* Floating hearts */}
      {step === "unlock" && (
        <div className="animated-hearts">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="heart"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -800, opacity: 1 }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
              style={{ left: `${Math.random() * 100}%` }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {/* Question Page */}
      {step === "question" && (
        <>
          <motion.img
            src={
              gifSad
                ? "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif"
                : "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJjaWU2c21ocWJ4ZW9hcmJ6cWZ2MDZkamE2YmozYXVja2o3MzRhYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNda43EOEuu0o84WA/giphy.gif"
            }
            alt="Love Gif"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-4 rounded"
            style={{ width: "280px", height: "150px", objectFit: "cover" }}
          />

          <h3
            className="mb-4 text-center fw-bold"
            style={{
              fontSize: "1.3rem",
              fontFamily: "'Dancing Script', cursive",
              color: "#8B0000",
              lineHeight: "1.4",
              textShadow: "1px 1px 3px #FFC0CB",
            }}
          >
            💖 Hey love ! I’m <span style={{ color: "#FF1493" }}>{name}</span> ❤️
            <br />
            Will you be my forever ? 💕
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#800000" }}>
            🌟 Created with ❤️ by <strong>Gulam Mustafa</strong>
          </p>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-success"
              style={{ width: "100px", height: "50px" }}
              onClick={() => setStep("unlock")}
            >
              Yes 💕
            </motion.button>

            <motion.button
              className="btn btn-danger"
              style={{ width: "100px", height: "50px" }}
              onClick={handleNoClick}
            >
              No 💔
            </motion.button>
          </div>

          <button className="btn btn-primary mt-2" onClick={handleShare}>
            Share ❤️
          </button>
        </>
      )}

      {/* Unlock Page */}
      {step === "unlock" && (
        <>
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
            alt="Locked Heart"
            animate={wrongTry ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ width: "150px", marginBottom: "20px" }}
          />

          <h3
            className="mb-4 text-center fw-bold"
            style={{
              fontSize: "1.2rem",
              fontFamily: "'Dancing Script', cursive",
              color: "#8B0000",
              lineHeight: "1.4",
              textShadow: "1px 1px 3px #FFC0CB",
            }}
          >
            Unlock my heart 💖
          </h3>

          <div className="d-flex justify-content-center gap-3 mb-4">
            {hearts.map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                className="btn btn-outline-danger rounded-circle"
                style={{
                  fontSize: "24px",
                  width: "60px",
                  height: "60px",
                  color: "#FF1493",
                  borderColor: "#FF69B4",
                }}
                onClick={() => handleHeartClick(num)}
              >
                ❤️
              </motion.button>
            ))}
          </div>

          {unlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="mt-5 p-4 rounded shadow-lg"
              style={{
                backgroundColor: "#FFC0CB",
                color: "#800000",
                textAlign: "center",
              }}
            >
              <h2 style={{ fontFamily: "'Dancing Script', cursive" }}>
                💖 You unlocked my heart! 💖
              </h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                My love, you’ve found the key to my heart! 🌹 Every beat of my
                heart is yours, every smile is for you, and every moment I spend
                with you is my happiest. Together, we can make endless memories
                and endless love. Forever yours, <strong>{name}</strong> ✨
              </p>
            </motion.div>
          )}
        </>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div className="p-4 rounded bg-white text-center" style={{ width: "280px" }}>
            <h4 className="mb-3" style={{ fontFamily: "'Dancing Script', cursive", color: "#8B0000" }}>
              Enter your name to share ❤️
            </h4>
            <input
              type="text"
              className="form-control mb-3 text-center"
              placeholder="Your Name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <button className="btn btn-success mb-3" onClick={handleSaveName}>
              Save Name
            </button>


<div className="d-flex justify-content-around mb-3">
  <a
    href={`https://wa.me/?text=${encodeURIComponent(`Hey! Check this out: ${shareUrl}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-success"
    style={{ fontSize: "20px", padding: "10px" }}
  >
    <FaWhatsapp />
  </a>
  <a
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Hey! Check this out: ${shareUrl}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-info text-white"
    style={{ fontSize: "20px", padding: "10px" }}
  >
    <FaTwitter />
  </a>
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary"
    style={{ fontSize: "20px", padding: "10px" }}
  >
    <FaFacebookF />
  </a>
  <button
    className="btn btn-danger"
    style={{ fontSize: "20px", padding: "10px" }}
    onClick={copyLink}
  >
    <FaShareAlt />
  </button>
</div>


            <button className="btn btn-secondary mt-2" onClick={() => setShowShareModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating hearts CSS */}
      <style>{`
        .animated-hearts {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        .heart {
          position: absolute;
          bottom: 0;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}
