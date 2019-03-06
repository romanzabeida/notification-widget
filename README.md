## Notification Widget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Up and running

To run the project all you need to do is:

### `npm install`
### `npm start`

In opened browser tab with URL [http://localhost:3000](http://localhost:3000) you can enter developer-tools console and type next:

```javascript
NotificationWidget.show('Some notification text', 'tl', 'info')
```

Now you should be able to see notification with text `Some notification text` in top-left corner of page.

Link to `NotificationWidget` component API is set to `window` using React's `ref` mechanism in `src/index.tsx`:

```javascript
componentDidMount(): void {
    (window as any).NotificationWidget = {
        show: this.notificationWidgetRef!.current!.show.bind(
            this.notificationWidgetRef.current
        )
    };
}
```

## Testing
To run tests you need to call:

### `npm test`

## Important notes

Source code you'd like to check is located under `src/NotificationWidget` directory.

## TODO: 

Need to introduce an acceptance test for notification flow.
