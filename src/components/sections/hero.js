import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Typed from 'react-typed';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi! I'm</h1>;
  const two = <h2 className="big-heading">Prahas Pattem,</h2>;
  // const three = <h3 className="big-heading">I build things for the web.</h3>;
  // const three = (
  //   <h3 className="big-heading">
  //     I'm a {''}
  //     <Typed strings={[' I build things for the web.', ' programmer.']} typeSpeed={100} backSpeed={150} loop />
  //   </h3>
  // );
  const three = (
    <h3 className="medium-heading">
      <Typed strings={['a computer science student at Purdue.']} typeSpeed={75} />
    </h3>
  );
  // const three = <h3 className="big-heading"> </h3>;
  // const four = (
  //   <>
  //     <p>
  //       I am a Computer Science Student at{' '}
  //       <a href="https://www.cs.purdue.edu" target="_blank">
  //         Purdue University
  //       </a>
  //       . Currently, I am looking for internship opportunites for Summer 2023.
  //     </p>
  //   </>
  // );
  // const three = <h3 className="big-heading"> </h3>;
  const four = (
    <>
      <p>
        I have a passion for <a> high quality software</a> and I enjoy developing software
        applications to solve real-life problems. I am looking for a{' '}
        <a> Software Engineering Internship</a> for <a>Summer 2023.</a>
      </p>
    </>
  );

  const five = (
    <div>
      <a
        className="email-link"
        // href="https://www.newline.co/courses/build-a-spotify-connected-app"
        href="/#about"
        // target="_blank"
        rel="noreferrer">
        Learn More
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
