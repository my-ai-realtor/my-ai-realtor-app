import React from 'react';
import PropTypes from 'prop-types';

const Address = ({ address }) => (
  <tr>
    <td>{address.address}</td>
  </tr>
);
Address.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
  }).isRequired,
};
export default Address;
