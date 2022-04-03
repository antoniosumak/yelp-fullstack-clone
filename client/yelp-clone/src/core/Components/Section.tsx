import * as React from 'react';

interface ISectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: ISectionProps): JSX.Element => {
  return (
    <section className='px-16 py-8 lg:max-w-[960px] xl:max-w-[1028px] min-h-screen mx-auto bg-white'>
      {children}
    </section>
  );
};

export default Section;
