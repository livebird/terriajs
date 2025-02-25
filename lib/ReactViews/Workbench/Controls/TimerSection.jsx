"use strict";

import React from "react";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";
import defined from "terriajs-cesium/Source/Core/defined";

import ObserveModelMixin from "../../ObserveModelMixin";
import Timer from "../../Generic/Timer/Timer";

import Styles from "./timer-section.scss";

const TimerSection = createReactClass({
  displayName: "TimerSection",
  mixins: [ObserveModelMixin],

  propTypes: {
    item: PropTypes.object.isRequired
  },

  isEnabled() {
    return (
      defined(this.props.item) &&
      defined(this.props.item.polling) &&
      this.props.item.polling.isPolling &&
      defined(this.props.item.polling.nextScheduledUpdateTime) &&
      this.props.item.polling.seconds < 30 * 60 * 1000 // only show refresh timer for refresh intervals less than 30 minutes
    );
  },

  getInitialState() {
    return {
      secondsLeft: 0
    };
  },

  getCountdownDuration() {
    // How many seconds until our next update?
    return Math.floor(
      (this.props.item.polling.nextScheduledUpdateTime.getTime() -
        new Date().getTime()) /
        1000
    );
  },

  getTimerStartTime() {
    return new Date(
      this.props.item.polling.nextScheduledUpdateTime -
        this.props.item.polling.seconds * 1000
    );
  },

  // Ticks down the countdown clock
  countdown() {
    if (this.state.secondsLeft > 0) {
      this.setState(() => {
        return {
          secondsLeft: this.state.secondsLeft - 1
        };
      });
    } else {
      // Stop.
      clearInterval(this.interval);
    }
  },

  startCountdown() {
    this.setState({
      secondsLeft: this.getCountdownDuration()
    });
    this.interval = setInterval(this.countdown, 1000);
  },

  getCountdownString() {
    const date = new Date(null);
    date.setSeconds(this.state.secondsLeft);

    const addLeadingZeroIfRequired = numString =>
      numString.length < 2 ? "0" + numString : numString;

    const minutes = addLeadingZeroIfRequired(date.getMinutes().toString());
    const seconds = addLeadingZeroIfRequired(date.getSeconds().toString());

    return `00:${minutes}:${seconds}`;
  },

  componentDidUpdate() {
    if (!this.isEnabled()) {
      return;
    }

    if (this.nextUpdate !== this.props.item.polling.nextScheduledUpdateTime) {
      if (defined(this.interval)) {
        clearInterval(this.interval);
      }
      this.startCountdown();
      this.nextUpdate = this.props.item.polling.nextScheduledUpdateTime;
    }
  },

  componentDidMount() {
    if (!this.isEnabled()) {
      return;
    }

    this.startCountdown();
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <>
        <If condition={this.isEnabled()}>
          <div className={Styles.section}>
            <div className={Styles.timerContainer}>
              <Timer
                tooltipText={`Next data update at ${
                  this.props.item.polling.nextScheduledUpdateTime
                }`}
                radius={10}
                start={this.getTimerStartTime().getTime()}
                stop={this.props.item.polling.nextScheduledUpdateTime.getTime()}
              />
            </div>
            <span>Next data update in {this.getCountdownString()}</span>
          </div>
        </If>
      </>
    );
  }
});

module.exports = TimerSection;
