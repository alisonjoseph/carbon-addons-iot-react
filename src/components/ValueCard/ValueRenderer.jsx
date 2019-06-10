import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CARD_LAYOUTS } from '../../constants/LayoutConstants';

const propTypes = {
  value: PropTypes.any, // eslint-disable-line
  unit: PropTypes.any, // eslint-disable-line
  layout: PropTypes.oneOf(Object.values(CARD_LAYOUTS)),
  hasSecondary: PropTypes.bool,
  precision: PropTypes.number,
  color: PropTypes.string,
  isVertical: PropTypes.bool,
};

const defaultProps = {
  layout: CARD_LAYOUTS.HORIZONTAL,
  hasSecondary: false,
  precision: 0,
  color: null,
  isVertical: false,
};

const Attribute = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => (props.unit || props.hasSecondary) && !props.isVertical && `max-width: 66%`};
  ${props => props.color && `color: ${props.color}`}
`;
const AttributeValue = styled.span`
  font-size: ${props => (props.hasSecondary ? '2.5rem' : '3.0rem')};
  font-weight: lighter;
  ${props => props.layout === CARD_LAYOUTS.VERTICAL && `text-align: left;`};
  white-space: nowrap;
`;

const StyledBoolean = styled.span`
  text-transform: capitalize;
`;

/** This components job is determining how to render different kinds of card values */
const ValueRenderer = ({ value, unit, layout, precision, hasSecondary, color, isVertical }) => {
  let renderValue = value;
  if (typeof value === 'boolean') {
    renderValue = <StyledBoolean>{value.toString()}</StyledBoolean>;
  }
  if (typeof value === 'number') {
    renderValue =
      value > 1000000000000
        ? (value / 1000000000000).toFixed(precision)
        : value > 1000000000
        ? (value / 1000000000).toFixed(precision)
        : value > 1000000
        ? (value / 1000000).toFixed(precision)
        : value > 1000
        ? (value / 1000).toFixed(precision)
        : value.toFixed(precision);
  }
  return (
    <Attribute unit={unit} hasSecondary={hasSecondary} color={color} isVertical={isVertical}>
      <AttributeValue title={`${value} ${unit || ''}`} layout={layout} hasSecondary={hasSecondary}>
        {renderValue}
      </AttributeValue>
    </Attribute>
  );
};

ValueRenderer.propTypes = propTypes;
ValueRenderer.defaultProps = defaultProps;

export default ValueRenderer;
