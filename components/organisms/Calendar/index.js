/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Calendar } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { colors } from '../../~reusables';
import { doFetchCalendarEvent } from '../../../redux/actions/events';

const AntCalendar = ({ doFetchCalendarEvent }) => {
  const CalendarDiv = styled.div`
    width: 32.5%;
    height: 32.5rem;
    padding: .5rem;
    border: .1rem solid ${colors.tertiary};
    border-radius: 1.5rem;
  `;

  const onClick = (event) => {
    const { userSearchCity, userSearchCountry, userInitialCountry, userInitialCity } = localStorage;
    const userCity = userSearchCity || userInitialCity;
    const userCountry = userSearchCountry || userInitialCountry;
    const startDate = moment(event._d).format('YYYY-MM-DD');
    const endDate = moment(event._d).add(1, 'd').format('YYYY-MM-DD');
    const eventType = 'all';
    doFetchCalendarEvent(userCountry, userCity, eventType, startDate, endDate);
  };

  return (
    <CalendarDiv>
      <Calendar
        fullscreen={false}
        onSelect={event => onClick(event)}
      />
    </CalendarDiv>
  );
};

AntCalendar.propTypes = {
  doFetchCalendarEvent: PropTypes.func.isRequired,
};

export default connect(null, { doFetchCalendarEvent })(AntCalendar);