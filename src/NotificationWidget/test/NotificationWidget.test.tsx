import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotificationWidget, DismissDelay } from '../NotificationWidget';
import { NotificationPosition, NotificationType } from '../types';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

// @ts-ignore
describe('NotificationWidget', () => {
    afterAll(() => {
        jest.clearAllTimers();
    });

    test('should add notification on show(...) method call', () => {
        const wrapper = shallow<NotificationWidget>(<NotificationWidget />);
        const instance = wrapper.instance();

        instance.show(
            'some message...',
            NotificationPosition.TopLeft,
            NotificationType.Warning
        );

        const state = wrapper.state(NotificationPosition.TopLeft);
        expect(typeof state[0].id).toBe('number');
        expect(state[0].message).toBe('some message...');
        expect(state[0].position).toBe(NotificationPosition.TopLeft);
        expect(state[0].type).toBe(NotificationType.Warning);
    });

    test('should remove notification after default delay', () => {
        const wrapper = shallow<NotificationWidget>(<NotificationWidget />);
        const instance = wrapper.instance();

        instance.show(
            'some message...',
            NotificationPosition.TopLeft,
            NotificationType.Warning
        );

        jest.advanceTimersByTime(DismissDelay * 1000);

        const state = wrapper.state(NotificationPosition.TopLeft);
        expect(state).toEqual([]);
    });

    test('should remove notification after given delay', () => {
        const wrapper = shallow<NotificationWidget>(<NotificationWidget />);
        const instance = wrapper.instance();

        instance.show(
            'some message...',
            NotificationPosition.TopLeft,
            NotificationType.Warning
        );

        jest.advanceTimersByTime(DismissDelay * 1000);

        const state = wrapper.state(NotificationPosition.TopLeft);
        expect(state).toEqual([]);
    });
});
