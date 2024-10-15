import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiBell, FiX } from 'react-icons/fi';
import { setShowNotifier } from '../redux/notifierSlice';


const NotifierBar = ({ message, onClose }) => {
//   const [isVisible, setIsVisible] = useState(true); // State to control visibility
const isVisible = useSelector((state) => state.notifier.showNotifier);
const dispatch = useDispatch();

  if (!isVisible) return null; // Don't render the notifier if it's closed

  return (
    <div className="bg-yellow-500 text-white px-4 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-20 shadow-lg">
      <div></div>
      <div className="flex items-center ">
        <FiBell className="w-5 h-5 mr-2" /> {/* Bell Icon */}
        <span className="font-bold mr-2">News!</span> {/* News! */}
        <span>{message}</span> {/* The actual news message */}
      </div>
      <button
        className="text-white hover:text-gray-300 focus:outline-none"
        onClick={() => {
          dispatch(setShowNotifier(false));
          onClose();
        }}
      >
        <FiX className="w-5 h-5" /> {/* Close Icon */}
      </button>
    </div>
  );
};

export default NotifierBar;
