import { ReactNode } from 'react';

const Key = ({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: string;
}) => {
  return (
    <button
      className={`bg-gray-500 h-[58px] rounded mr-[6px] last:mr-0 flex grow justify-center items-center ${
        classes ? classes : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Key;
