import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

function Squares(props){
  var squares = [];
  for (var i=0; i<props.numRows; i++){
    squares.push(<View style={{ height: 50, backgroundColor: props.color1 }}><Text>{i}</Text></View>);
    squares.push(<View style={{ height: 50, backgroundColor: props.color2 }}><Text>{i}</Text></View>);
  }
  return squares;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.leftIsScrolling = false;
    this.rigthIsScrolling = false;
  }
  render() {
    return (
      <View
        style={{flex: 1, alignItems: 'flex-start',backgroundColor: 'yellow'}}>
        <View style={{ backgroundColor: '#bbb', flexDirection: 'row' }}>
          
            <ScrollView
              scrollEventThrottle={16}
              ref={scrollView => { this._leftView = scrollView; }}
              onScroll={e => {
                if (!this.leftIsScrolling) {
                  this.rigthIsScrolling = true;
                  var scrollY = e.nativeEvent.contentOffset.y;
                  this._rightView.scrollTo({ y: scrollY });
                }
                this.leftIsScrolling = false;
              }}>
              <Squares numRows={20} color1={"green"} color2={"darkgreen"} />
            </ScrollView>
          
          <ScrollView
            ref={scrollView => { this._rightView = scrollView; }}
            scrollEventThrottle={16}
            onScroll={e => {
              if (!this.rigthIsScrolling) {
                this.leftIsScrolling = true;
                var scrollY = e.nativeEvent.contentOffset.y;
                this._leftView.scrollTo({ y: scrollY });
              }
              this.rigthIsScrolling = false;
            }}>
            <Squares numRows={20} color1={"red"} color2={"darkred"} />

          </ScrollView>
        </View>
      </View>
    );
  }
}
