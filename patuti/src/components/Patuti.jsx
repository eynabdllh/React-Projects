import React, { useEffect, useState, useCallback } from "react";

const images = require.context(
  "../../public/img/moves",
  false,
  /\.png$/
);

const imageMap = {};

images.keys().forEach((image) => {
  const imageName = image.replace("./", "");
  imageMap[imageName] = images(image);
});

const idleList = ["idle-1.png", "idle-2.png"];
const dockList = ["dock-1.png", "dock-2.png", "dock-3.png", "dock-4.png", "dock-5.png",];
const jumpList = ["jump-1.png", "jump-2.png", "jump-3.png","jump-4.png", "jump-5.png", "jump-6.png", "jump-7.png",];
const leftList = ["left-1.png", "left-2.png", "left-3.png", "left-4.png", "left-5.png",];
const rightList = ["right-1.png", "right-2.png", "right-3.png","right-4.png", "right-5.png",];
const horizontalBulletImage = imageMap["bullet_h.png"];
const verticalBulletImage = imageMap["bullet_v.png"];

const positionConstraints = {
  maxX: 1070,
  minX: 570,
  maxY: 200,
  minY: 100,
};

const resetPosition = { x: 820, y: 285 };

function Bullet({ bullet }) {
  const { position, direction } = bullet;

  return (
    <img
      src={
        direction === "horizontal" ? horizontalBulletImage : verticalBulletImage
      }
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: "30px",
        height: "30px",
      }}
      alt="bullet"
    />
  );
}

export default function Patuti() {
  const [patutiState, setPatutiState] = useState(imageMap["idle-1.png"]);
  const [patutiList, setPatutiList] = useState(idleList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positionOffset, setPositionOffset] = useState(resetPosition);
  const [isFalling, setIsFalling] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [hp, setHp] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);

  const maxHp = 100;

  // FUNCTIONS
  /**
   * Calculate HP Bar
   */
  const calculateHpWidth = () => {
    return `${(hp / maxHp) * 100}%`;
  };

  /**
   * Falling Function
   */
  const triggerFall = useCallback(() => {
    setIsFalling(true);

    const fallInterval = setInterval(() => {
      setPositionOffset((prev) => {
        const newY = prev.y + 10;
        if (newY >= window.innerHeight - 10) {
          clearInterval(fallInterval);
          setPositionOffset(resetPosition);
          setIsFalling(false);
        }
        return { ...prev, y: newY };
      });
    }, 50);
  }, []);

  /**
   * Move Right Function
   */
  const moveRight = useCallback(() => {
    setPatutiList(rightList);
    setPositionOffset((prev) => {
      let newX = Math.min(positionConstraints.maxX, prev.x + 10);
      if (newX === positionConstraints.maxX) {
        triggerFall();
      }
      if (newX > window.innerWidth) {
        newX = resetPosition.x;
      }
      return { ...prev, x: newX };
    });
  }, [triggerFall]);

  /**
   * Move Left Function
   */
  const moveLeft = useCallback(() => {
    setPatutiList(leftList);
    setPositionOffset((prev) => {
      let newX = Math.max(positionConstraints.minX, prev.x - 10);
      if (newX === positionConstraints.minX) {
        triggerFall();
      }
      if (newX < 0) {
        newX = resetPosition.x;
      }
      return { ...prev, x: newX };
    });
  }, [triggerFall]);

  /**
   * Jumping Function
   */
  const triggerJump = useCallback(() => {
    if (isJumping || isFalling) return;
    setIsJumping(true);
    setPatutiList(jumpList);
    const jumpHeight = 150;
    const jumpDuration = 3500;

    const upInterval = setInterval(() => {
      setPositionOffset((prev) => {
        const newY = prev.y - 10;
        if (prev.y <= resetPosition.y - jumpHeight) {
          clearInterval(upInterval);

          const downInterval = setInterval(() => {
            setPositionOffset((downPrev) => {
              const fallY = downPrev.y + 10;
              if (fallY >= resetPosition.y) {
                clearInterval(downInterval);
                setIsJumping(false);
                return { ...downPrev, y: resetPosition.y };
              }
              return { ...downPrev, y: fallY };
            });
          }, jumpDuration / jumpHeight);
        }
        return { ...prev, y: newY };
      });
    }, jumpDuration / jumpHeight);
  }, [isJumping, isFalling]);

  /**
   * Ducking Function
   */
  const triggerDuck = useCallback(() => {
    if (isDucking || isJumping || isFalling) return;

    setIsDucking(true);
    setPatutiList(dockList);
    setCurrentIndex(0);

    const duckHeight = 20;
    const duckDuration = 500;
    const stayDuration = 1000;

    const downInterval = setInterval(() => {
      setPositionOffset((prev) => {
        const newY = Math.min(prev.y + 10, resetPosition.y + duckHeight);
        if (newY >= resetPosition.y + duckHeight) {
          clearInterval(downInterval);

          setTimeout(() => {
            const upInterval = setInterval(() => {
              setPositionOffset((upPrev) => {
                const upY = Math.max(upPrev.y - 10, resetPosition.y);
                if (upY <= resetPosition.y) {
                  clearInterval(upInterval);
                  setPatutiList(idleList);
                  setCurrentIndex(0);
                  setIsDucking(false);
                }
                return { ...upPrev, y: upY };
              });
            }, duckDuration / duckHeight);
          }, stayDuration);
        }
        return { ...prev, y: newY };
      });
    }, duckDuration / duckHeight);
  }, [isDucking, isJumping, isFalling]);

  const bulletSpeed = 12; 

  const spawnBullet = () => {
    const bulletType = Math.random() < 0.5 ? "horizontal" : "vertical";
 
    const rightPositions = [180, 280, 330]; 
    const topXPositions = [
      window.innerWidth / 2.38,      
      window.innerWidth / 2,        
      (3 * window.innerWidth) / 5.38 
    ];
  
    const createBullet = (x, y, direction) => ({
      id: Date.now() + Math.random(), 
      position: { x, y },
      direction,
    });
  
    const spawnTwoBullets = Math.random() < 0.2;
    const bulletsToSpawn = [];
  
    if (bulletType === "horizontal") {

      const randomIndex = Math.floor(Math.random() * rightPositions.length);
      const selectedYPosition = rightPositions[randomIndex];
      const newBullet = createBullet(window.innerWidth - 30, selectedYPosition, "horizontal");
      bulletsToSpawn.push(newBullet);
  
      if (spawnTwoBullets) {
        let secondIndex;
        do {
          secondIndex = Math.floor(Math.random() * rightPositions.length);
        } while (secondIndex === randomIndex); 
        const secondYPosition = rightPositions[secondIndex];
        const secondBullet = createBullet(window.innerWidth - 30, secondYPosition, "horizontal");
        bulletsToSpawn.push(secondBullet);
      }
    } else {
      const randomIndex = Math.floor(Math.random() * topXPositions.length);
      const selectedXPosition = topXPositions[randomIndex];
      const newBullet = createBullet(selectedXPosition, 10, "vertical");
      bulletsToSpawn.push(newBullet);
  
      if (spawnTwoBullets) {
        let secondIndex;
        do {
          secondIndex = Math.floor(Math.random() * topXPositions.length);
        } while (secondIndex === randomIndex); 
        const secondXPosition = topXPositions[secondIndex];
        const secondBullet = createBullet(secondXPosition, 10, "vertical");
        bulletsToSpawn.push(secondBullet);
      }
    }
    setBullets((prevBullets) => [...prevBullets, ...bulletsToSpawn]);
  };
  
useEffect(() => {
  const bulletInterval = setInterval(() => {
    setBullets((prevBullets) =>
      prevBullets
        .map((bullet) => {
          const newPosition = { ...bullet.position };
          if (bullet.direction === "horizontal") {
            newPosition.x -= bulletSpeed; 
          } else {
            newPosition.y += bulletSpeed; 
          }
          return { ...bullet, position: newPosition };
        })
        .filter((bullet) => {
          if (bullet.direction === "horizontal") {
            return bullet.position.x > 0;
          } else {
            return bullet.position.y < window.innerHeight;
          }
        })
    );
  }, 50);

  return () => clearInterval(bulletInterval);
}, []);

  /**
   * Patuti List Handler and Iteration
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (isDucking) {
          return patutiList.length - 1;
        }

        const newIndex = (prevIndex + 1) % patutiList.length;

        if (patutiList !== idleList && newIndex === 0) {
          setPatutiList(idleList);
          return 0;
        }

        return newIndex;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [patutiList, isDucking]);

  /**
   * Key Press Function
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (isFalling || isJumping) return;

      switch (e.key.toLowerCase()) {
        case "d":
          moveRight();
          break;
        case "a":
          moveLeft();
          break;
        case "w":
          triggerJump();
          break;
        case "s":
          triggerDuck();
          break;
        default:
          setPatutiList(idleList);
          break;
      }
    },
    [isFalling, isJumping, moveRight, moveLeft, triggerJump, triggerDuck]
  );

  // USE EFFECTS
  /**
   * Patuti List Handler and Iterator
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (isDucking) {
          return patutiList.length - 1;
        }

        const newIndex = (prevIndex + 1) % patutiList.length;

        if (patutiList !== idleList && newIndex === 0) {
          setPatutiList(idleList);
        }

        return newIndex;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [patutiList, isDucking]);

  /**
   * Patuti State Handler
   */
  useEffect(() => {
    setPatutiState(imageMap[patutiList[currentIndex]]);
  }, [currentIndex, patutiList]);

  /**
   * Key Press Handler
   */
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // idk unsa na ni lasdasdasd
  useEffect(() => {
    const checkCollisions = () => {
      bullets.forEach((bullet) => {
        const bulletLeft = bullet.position.x;
        const bulletRight = bullet.position.x + 20; 
        const bulletTop = bullet.position.y;
        const bulletBottom = bullet.position.y + 20; 
  
        const characterLeft = positionOffset.x;
        const characterRight = positionOffset.x + 50; 
        const characterTop = positionOffset.y;
        const characterBottom = positionOffset.y + 50; 
  
        if (
          bulletRight > characterLeft && 
          bulletLeft < characterRight && 
          bulletBottom > characterTop && 
          bulletTop < characterBottom    
        ) {
          setHp((prevHp) => Math.max(prevHp - 10, 0));
          setBullets((prevBullets) => prevBullets.filter((b) => b.id !== bullet.id));
        }
      });
    };
  
    let animationFrameId;
    const runCollisionCheck = () => {
      checkCollisions();
      animationFrameId = requestAnimationFrame(runCollisionCheck);
    };
  
    runCollisionCheck();
  
    return () => cancelAnimationFrame(animationFrameId);
  }, [bullets, positionOffset]);

  useEffect(() => {
    const spawnInterval = setInterval(spawnBullet, 2000);
    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    if (hp <= 0) {
      setIsGameOver(true);
    }
  }, [hp]);

  return (
    <main
      style={{
        backgroundImage: `url(${imageMap["background.png"]})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    
      {isGameOver ? ( 
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "#8967B3",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            zIndex: "999",
          }}
        >
          <h1 style={{ marginTop: '1em',fontSize: '150px', color: 'yellow' }}>Game Over</h1>
          <button 
            onClick={() => window.location.reload()} 
            style={{ fontSize: '64px', backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}
            >
            Tap to try again
            </button>
        </div>
      ) : (
        
        <div
          style={{
            backgroundImage: `url(${imageMap["area.png"]})`,
            width: "30em",
            height: "400px",
            backgroundSize: "contain",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            {bullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} />
            ))}
          </div>
          
          <img
            src={patutiState}
            style={{
              position: "absolute",
              top: `${positionOffset.y}px`,
              left: `${positionOffset.x}px`,
              width: "6em",
              height: "6em",
            }}
            alt="patuti.png"
            id="patuti-holder"
          />
        </div>
      )}
        
      {/* HP Bar */}
      <div
        style={{
          backgroundColor: "red",
          width: "350px",
          height: "55px",
          top: 745,
          left: 1280,
          border: "5px solid black",
          borderRadius: "5px",
          overflow: "hidden",
          position: "absolute",
        }}
      > 
        <div
          style={{
            backgroundColor: "green",
            width: calculateHpWidth(),
            height: "100%",
          }}
        />
      </div>
    </main>
  );
}