// import {Holdem} from './holdem';
// import {Card} from './card';

var {Holdem} = require('./Holdem');
var {Card} = require('./Card');
let gameState=new Holdem();
const player0Card1 = new Card("c", 13);
const player0Card2 = new Card("c", 11);
const player1Card1 = new Card("c", 2);
const player1Card2 = new Card("c", 3);
let playerCards=[[player0Card1,player0Card2],[player1Card1,player1Card2]];
const communityCard1 = new Card("c", 9);
const communityCard2 = new Card("s", 9);
const communityCard3 = new Card("d", 9);
const communityCard4 = new Card("s", 2);
const communityCard5 = new Card("c", 7);
let communityCards=[communityCard1,communityCard2,communityCard3,communityCard4,communityCard5];
let result=gameState.compareHands(playerCards,communityCards);
