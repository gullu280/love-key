// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLink,
  FaInstagram,
  FaFacebookMessenger,
} from "react-icons/fa";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedName = urlParams.get("name") || "Gulam Mustafa";

  const [step, setStep] = useState("question");
  const [name, setName] = useState(sharedName);
  const [gifSad, setGifSad] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [wrongTry, setWrongTry] = useState(false);
  const [hearts, setHearts] = useState([0, 1, 2]);
  const [customName, setCustomName] = useState(name);
  const [nameSaved, setNameSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [clickCount, setClickCount] = useState(0);
  const [luckMessage, setLuckMessage] = useState("");
  const [unlockRating, setUnlockRating] = useState("");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (step === "unlock")
      setHearts([0, 1, 2].sort(() => Math.random() - 0.5));
  }, [step]);

  const correctIndex = 2;
  const shareUrl = `${window.location.origin}?name=${encodeURIComponent(
    customName
  )}`;

  const handleHeartClick = (index) => {
    setClickCount((prev) => prev + 1);

    if (index === correctIndex) {
      setUnlocked(true);
      setWrongTry(false);
      if (clickCount === 0)
        setUnlockRating(
          "🌟 Wow! You unlocked me on your first try! Your luck is amazing for me!"
        );
      else if (clickCount === 1)
        setUnlockRating(
          "✨ Lucky you! You unlocked me on your second try! Your luck is good for me!"
        );
      else
        setUnlockRating(
          "💖 Not lucky this time, but still special! You unlocked me finally!"
        );

      setLuckMessage("");
      setTimeout(() => {
        setStep("question");
        setUnlocked(false);
        setClickCount(0);
        setUnlockRating("");
      }, 10000);
    } else {
      setWrongTry(true);
      const messages = [
        "🌟 Amazing! Your luck is shining!",
        "✨ Lucky you! Almost there!",
        "💖 Not lucky this time, but still special!",
      ];
      setLuckMessage(messages[clickCount] || "💫 Keep trying, your luck awaits!");
      setTimeout(() => setWrongTry(false), 500);
    }
  };

  const handleNoClick = () => {
    setGifSad(true);
    setTimeout(() => setGifSad(false), 5000);
  };

  const handleSaveName = () => {
    if (customName.trim() === "") {
      alert("Please enter your name to share!");
      return;
    }
    setName(customName);
    setNameSaved(true);
    
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

      {/* Question Step */}
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

          {/* Romantic message after GIF */}
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
            💖 Hey love! I'm <span style={{ color: "#FF1493" }}>{name}</span> ❤️
            <br />
            Will you be my forever? 💕
          </h3>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-success"
              style={{ width: "100px", height: "50px" }}
              onClick={() => {
                setStep("unlock");
                setClickCount(0);
                setLuckMessage("");
                setUnlockRating("");
              }}
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

          {/* Name input */}
          <p style={{ fontSize: "0.9rem", color: "#FF1493" }}>
            💡 You can change your name before sharing so your special one sees
            it!
          </p>
          <input
            type="text"
            className="form-control mb-2 text-center"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            style={{ maxWidth: "300px" }}
          />

          {/* Save & Share buttons */}
          <div className="d-flex justify-content-center gap-2 mb-2">
            <button className="btn btn-success" onClick={handleSaveName}>
              Save Name
            </button>
            <button
              className="btn btn-primary"
              disabled={!nameSaved}
              onClick={() => setShowShareModal(true)}
            >
              Share ❤️
            </button>
          </div>

          {/* 🌟 Created By Gulam Mustafa (shifted here) */}
          <p style={{ fontSize: "0.9rem", color: "#800000" }}>
            🌟 Created with ❤️ by <strong>Gulam Mustafa</strong>
          </p>

          {/* Share Modal */}
          {showShareModal && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
            >
              <div
                className="p-4 rounded bg-white text-center"
                style={{ width: "340px" }}
              >
                <h4
                  className="mb-3"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    color: "#8B0000",
                  }}
                >
                  Share ❤️
                </h4>
                <div className="d-flex flex-wrap justify-content-around mb-3 gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          `Hey! Check this out: ${shareUrl}`
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <FaFacebookF /> Facebook
                  </button>
                  <button
                    className="btn btn-info text-white"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent("Check this out!")}`,
                        "_blank"
                      )
                    }
                  >
                    <FaTwitter /> Twitter
                  </button>

                  {/* Instagram, IMO, Messenger */}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (isMobile) {
                        window.open(
                          `instagram://share?text=${encodeURIComponent(
                            shareUrl
                          )}`,
                          "_blank"
                        );
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Copy this link and share on Instagram!");
                      }
                    }}
                  >
                    <FaInstagram /> Instagram
                  </button>

                  <button
                    className="btn btn-warning text-white"
                    onClick={() => {
                      if (isMobile) {
                        window.open(
                          `imo://send?text=${encodeURIComponent(shareUrl)}`,
                          "_blank"
                        );
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Copy this link and share via IMO!");
                      }
                    }}
                  >
                    IMO
                  </button>

                  <button
                    className="btn btn-primary text-white"
                    onClick={() => {
                      if (isMobile) {
                        window.open(
                          `fb-messenger://share?link=${encodeURIComponent(
                            shareUrl
                          )}`,
                          "_blank"
                        );
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Copy this link and share via Messenger!");
                      }
                    }}
                  >
                    <FaFacebookMessenger /> Messenger
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert("Link copied!");
                    }}
                  >
                    <FaLink /> Copy Link
                  </button>
                </div>
                <button
                  className="btn btn-dark"
                  onClick={() => setShowShareModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Unlock Step */}
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

          <div className="d-flex justify-content-center gap-3 mb-2">
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

          {luckMessage && (
            <p
              style={{
                color: "#FF1493",
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "10px",
              }}
            >
              {luckMessage}
            </p>
          )}
          {unlockRating && (
            <p
              style={{
                color: "#FF1493",
                fontWeight: "bold",
                fontSize: "1rem",
                marginTop: "10px",
              }}
            >
              {unlockRating}
            </p>
          )}

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
    </div>
  );
}
