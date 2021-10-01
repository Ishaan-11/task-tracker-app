import PropTypes from 'prop-types';

function Header({title}) {
  return (
    <header className='header'>
      <h1>{title}</h1>
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker',
};

// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// };

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;