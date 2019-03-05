import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotificationWidget, DismissDelay } from '../NotificationWidget';
import { Position, Type } from '../types';

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

        instance.show('some message...', Position.TopLeft, Type.Warning);

        const state = wrapper.state(Position.TopLeft);
        expect(typeof state[0].id).toBe('number');
        expect(state[0].message).toBe('some message...');
        expect(state[0].position).toBe(Position.TopLeft);
        expect(state[0].type).toBe(Type.Warning);
    });

    test('should remove notification after default delay', () => {
        const wrapper = shallow<NotificationWidget>(<NotificationWidget />);
        const instance = wrapper.instance();

        instance.show('some message...', Position.TopLeft, Type.Warning);

        jest.advanceTimersByTime(DismissDelay * 1000);

        const state = wrapper.state(Position.TopLeft);
        expect(state).toEqual([]);
    });

    test('should remove notification after given delay', () => {
        const wrapper = shallow<NotificationWidget>(<NotificationWidget />);
        const instance = wrapper.instance();

        instance.show('some message...', Position.TopLeft, Type.Warning);

        jest.advanceTimersByTime(DismissDelay * 1000);

        const state = wrapper.state(Position.TopLeft);
        expect(state).toEqual([]);
    });
});
