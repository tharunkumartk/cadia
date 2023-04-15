import { Card, Suit } from "./Card";
import { TieBreaker } from "./TieBreaker";

export const DESC = (a: any, b: any): number => b.value - a.value;
const ASC = (a: Card, b: Card): number => a.value - b.value;
const VASC = (a: number, b: number): number => a - b;

const HAND_HIGHCARD = "High Card";
const HAND_PAIR = "Pair";
const HAND_TWOPAIRS = "Two pairs";
const HAND_THREEOFAKIND = "Three of a kind";
const HAND_STRAIGHT = "Straight";
const HAND_FLUSH = "Flush";
const HAND_FULLHOUSE = "Full House";
const HAND_FOUROFAKIND = "Four of a kind";
const HAND_STRAIGHTFLUSH = "Straight flush";
const HAND_ROYALFLUSH = "Royal flush";

export interface HandValue {
    name: string;
    value: number;
}
/**
 * Result of compareHands
 * 
 * @property type   win or draw
 * @property index  winner index(if win)
 * @property name   winning hand
 * @property suit   suit name if won with high card
 * @property value  card value if won with high card
 */
export interface Result {
    type: 'win' | 'draw';
    index?: number;
    name?: string;
    suit?: string;
    value?: number;
    tieBreak?: number;
}
interface TestCache {
    high_card: {
        suit: string;
        value: number;
        kicker: {
            suit: string;
            value: number;
        }
    },
    pair: {
        value: number,
        index: number
    };
    two_pairs: {
        all_indices: Array<number>,
        pair_indices: Array<number>
    };
    three_of_a_kind: {
        value: number,
        indices: Array<number>
    };
    four_of_a_kind: number,
    straight: { start?: number; result: boolean; };
    flush: any;
    straight_flush: boolean;
}
export interface Rank {
    index: number;
    cache: TestCache;
    hand: Card[];
    name: string;
    value: number;
}

export class Holdem {
    private test_cache: TestCache = {
        high_card: {
            suit: '',
            value: 0,
            kicker: {
                suit: '',
                value: 0,
            }
        },
        pair: {
            value: 0,
            index: -1
        },
        two_pairs: {
            all_indices: [],
            pair_indices: []
        },
        three_of_a_kind: {
            value: 0,
            indices: []
        },
        four_of_a_kind: 0,
        straight: { result: false },
        flush: { result: false },
        straight_flush: false,
    };
    private test_summary: {
        value: {
            [key: number]: Array<number> // array of index
        },
        suit: {
            [key: string]: Array<number> // array of index
        }
    } = {
            value: {},
            suit: {}
        };
    private TestSeries: { name: string, fn: Function }[] = [
        { name: HAND_HIGHCARD, fn: this.TestHighCard },
        { name: HAND_PAIR, fn: this.TestPair },
        { name: HAND_TWOPAIRS, fn: this.TestTwoPairs },
        { name: HAND_THREEOFAKIND, fn: this.TestThreeOfAKind },
        { name: HAND_STRAIGHT, fn: this.TestStraight },
        { name: HAND_FLUSH, fn: this.TestFlush },
        { name: HAND_FULLHOUSE, fn: this.TestFullHouse },
        { name: HAND_FOUROFAKIND, fn: this.TestFourOfAKind },
        { name: HAND_STRAIGHTFLUSH, fn: this.TestStraightFlush },
        // { name: HAND_ROYALFLUSH, fn: this.TestRoyalFlush }
    ];
    //Simple value of the card. Lowest: 2 - Highest: Ace(14)
    private TestHighCard(hand: Array<Card>) {
        const [high_card, kicker] = hand.slice(0).sort(DESC);
        this.test_cache.high_card = {
            suit: `${high_card.suit}`,
            value: high_card.value,
            kicker: {
                suit: `${kicker.suit}`,
                value: kicker.value
            }
        };
        return high_card.value;
    }
    //Two cards with the same value
    private TestPair(hand: Array<Card>) {
        for (let key in this.test_summary.value)
            if (this.test_summary.value[key].length == 2) {
                this.test_cache.pair = { value: Number(key), index: this.test_summary.value[key][0] };
                return true;
            }
        return false;
    }
    //Two times two cards with the same value
    private TestTwoPairs(hand: Array<Card>) {
        let all_indices: number[] = [];
        let pair_indices: number[] = [];
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length == 2) {
                let [a, b] = this.test_summary.value[key];
                pair_indices.push(a);
                all_indices.push(a);
                all_indices.push(b);
            }
        }
        if (pair_indices.length >= 2) {
            this.test_cache.two_pairs = { all_indices, pair_indices };
            return true;
        }
    }
    //Three cards with the same value
    private TestThreeOfAKind(hand: Array<Card>) {
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length >= 3) {
                this.test_cache.three_of_a_kind.value = Number(key);
                this.test_cache.three_of_a_kind.indices = this.test_summary.value[key];
                return true;
            }
        }
    }
    //Sequence of 5 cards in increasing value (Ace can precede 2 and follow up King)
    private TestStraight(hand: Array<Card>) {
        const sortedHand = hand.slice(0).sort(ASC);
        let count = 1;
        let prev = sortedHand[0].value;
        let startValue = 0;
        let result = false;
        for (let i = 1; i < sortedHand.length; i++) {
            const curr = sortedHand[i].value;
            if (curr - prev === 1) {
                startValue = prev;
                count++;
                if (count === 5) {
                    this.test_cache.straight.result = true;
                    this.test_cache.straight.start = i - 4;
                    result = true;
                }
            } else if (curr !== prev) {
                count = 1;
            }
            prev = curr;
        }
        this.test_cache.straight.result = result;
        if (result) {
            this.test_cache.straight.start = hand.findIndex((card: Card) => card.value === startValue);
        }
        return result;
    }
    //5 cards of the same suit
    private TestFlush(hand: Array<Card>) {
        for (let key in this.test_summary.suit) {
            if (this.test_summary.suit[key].length >= 5) {
                this.test_cache.flush = { suit: key, result: true };
                return true;
            }
        }
        this.test_cache.flush = {
            result: false
        };
    }
    //Combination of three of a kind and a pair
    private TestFullHouse(hand: Array<Card>) {
        if (this.test_cache.three_of_a_kind.indices.length >= 3 && this.test_cache.pair.value >= 2) {
            return this.test_cache.three_of_a_kind.value !== this.test_cache.pair.value;
        }
    }
    //Four cards of the same value
    private TestFourOfAKind(hand: Array<Card>) {
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length >= 4) {
                this.test_cache.four_of_a_kind = Number(key);
                return true;
            }
        }
    }
    //Straight of the same suit
    private TestStraightFlush(hand: Array<Card>) {
        if (this.test_cache.straight.result && this.test_cache.straight.start !== undefined && this.test_cache.flush.result) {
            if (hand[this.test_cache.straight.start].suit === this.test_cache.flush.suit) {
                this.test_cache.straight_flush = true;
                return true;
            }
        }
    }
    //Straight flush from Ten to Ace
    private TestRoyalFlush(hand: Array<Card>) {
        return this.test_cache.straight_flush && this.test_cache.straight.start !== undefined && hand[this.test_cache.straight.start].value == 10;
    }

    // update the hand of 7 cards to 5 cards that reflect the best hand name
    updateBestHand(hand: Array<Card>, bestHandName: string) {
        // create a copy of hand
        let newHands = hand.slice(0);
        newHands.sort((a, b) => b.value - a.value);
        // picking the highest value cards
        if (bestHandName === 'High Card') {
            newHands.splice(5);
        } 
        else if (bestHandName === 'Pair') {
            let highestPairValue = 0;
            const nonPairCards: Card[] = [];
            newHands.forEach(card => {
                if (newHands.filter(c => c.value === card.value).length === 2 && card.value > highestPairValue) {
                    highestPairValue = card.value; /* get the highest pair value */
                } 
            });
            newHands.forEach(card => {
                if (card.value !== highestPairValue) {
                    nonPairCards.push(card);
                }
            });
            nonPairCards.sort((a, b) => b.value - a.value);
            nonPairCards.splice(3);
            newHands = newHands.filter(card => card.value === highestPairValue).concat(nonPairCards);
        } 
        else if (bestHandName === 'Two pairs') {
            const highestPairValues: number[] = [];
            const nonPairCards: Card[] = [];
            newHands.forEach(card => {
                if (newHands.filter(c => c.value === card.value).length === 2 && !highestPairValues.includes(card.value)) {
                    highestPairValues.push(card.value);
                } 
            });
            highestPairValues.sort((a, b) => b - a);
            highestPairValues.splice(2);
            newHands.forEach(card => {
                if (!highestPairValues.includes(card.value)) {
                    nonPairCards.push(card);
                }
            });
            nonPairCards.sort((a, b) => b.value - a.value);
            nonPairCards.splice(1);
            newHands = newHands.filter(card => highestPairValues.includes(card.value)).concat(nonPairCards);
        } 
        else if (bestHandName === 'Three of a kind') {
            let tripleValue = 0;
            const nonTripleCards: Card[] = [];
            newHands.forEach(card => {
                if (newHands.filter(c => c.value === card.value).length === 3) {
                    tripleValue = card.value;
                } 
            });
            newHands.forEach(card => {
                if (card.value !== tripleValue) {
                    nonTripleCards.push(card);
                }
            });
            nonTripleCards.sort((a, b) => b.value - a.value);
            nonTripleCards.splice(2);
            newHands = newHands.filter(card => card.value === tripleValue).concat(nonTripleCards);
        } 
        else if (bestHandName === 'Straight') {
            let straightCards: Card[] = [newHands[0]];
            for (let i = 1; i < hand.length; i++) {
                if (straightCards[straightCards.length - 1].value === newHands[i].value + 1) {
                    straightCards.push(newHands[i]);
                    if (straightCards.length === 5) break;
                } 
                else {
                    straightCards = [newHands[i]];
                }
            }
            if (straightCards.length < 5 && newHands[0].value === 14) {
                straightCards.push(newHands[newHands.findIndex(card => card.value === 14)]);
            }
            newHands = straightCards;
        } 
        else if (bestHandName === 'Full House') {
            let tripletValues: number[] = []
            let pairValues: number[] = [];
            let nonTripletCards: Card[] = [];
            for (let i = 0; i < newHands.length - 2; i++) {
                if (newHands[i].value === newHands[i + 1].value && newHands[i + 1].value === newHands[i + 2].value) {
                    tripletValues.push(newHands[i].value);
                }
            }
            tripletValues.sort((a, b) => b - a);
            tripletValues.splice(1);
            const triplets: Array<Card> = [];
            for (let i = 0; i < newHands.length; i++) {
                if (newHands[i].value === tripletValues[0] && triplets.length < 3) {
                    triplets.push(newHands[i]);
                }
                else {
                    nonTripletCards.push(newHands[i]);
                }
            }
            nonTripletCards.sort((a, b) => b.value - a.value);
            for (let i = 0; i < nonTripletCards.length - 1; i++) {
                if (nonTripletCards[i].value === nonTripletCards[i + 1].value) {
                    pairValues.push(nonTripletCards[i].value);
                }
            }
            pairValues.sort((a, b) => b - a);
            pairValues.splice(1);
            const pairs: Array<Card> = [];
            for (let i = 0; i < nonTripletCards.length; i++) {
                if (nonTripletCards[i].value === pairValues[0] && pairs.length < 2) {
                    pairs.push(nonTripletCards[i]);
                }
            }
            newHands = triplets.concat(pairs);
        }
        else if (bestHandName === 'Four of a kind') {
            let quadValue = 0;
            let nonQuadCards: Card[] = [];
            for (let i = 0; i < newHands.length - 3; i++) {
                if (newHands[i].value === newHands[i + 1].value && newHands[i + 1].value === newHands[i + 2].value && newHands[i + 2].value === newHands[i + 3].value) {
                    quadValue = newHands[i].value;
                }
            }
            let QuadCards: Array<Card> = [];
            for (let i = 0; i < newHands.length; i++) {
                if (newHands[i].value === quadValue && QuadCards.length < 4) {
                    QuadCards.push(newHands[i]);
                }
                else {
                    nonQuadCards.push(newHands[i]);
                }
            }
            nonQuadCards.sort((a, b) => b.value - a.value);
            newHands = QuadCards.concat(nonQuadCards[0]);
        }
        else if (bestHandName === 'Flush') {
            // find the suit that has more than 5 cards
            let flushSuit: Suit | null = null;
            newHands.forEach(card => {
                if (newHands.filter(c => c.suit === card.suit).length >= 5) {
                    flushSuit = card.suit;
                }
            });
            newHands = newHands.filter(card => card.suit === flushSuit);
            newHands.splice(5);
        }
        else if (bestHandName === 'Straight Flush') {
            // find the suit that has 5 cards
            let flushSuit: Suit | null = null;
            newHands.forEach(card => {
                if (newHands.filter(c => c.suit === card.suit).length >= 5) {
                    flushSuit = card.suit;
                }
            });
            newHands = newHands.filter(card => card.suit === flushSuit);
            // Find the straight flush (5 cards in sequence and of the same suit)
            let straightFlushCards: Card[] = [newHands[0]];
            for (let i = 1; i < newHands.length; i++) {
                if (straightFlushCards[straightFlushCards.length - 1].value === newHands[i].value + 1) {
                    straightFlushCards.push(newHands[i]);
                if (straightFlushCards.length === 5) break;
                } 
                else if (straightFlushCards[straightFlushCards.length - 1].value !== newHands[i].value) {
                    straightFlushCards = [newHands[i]];
                }
            }
            if (straightFlushCards.length < 5 && hand[0].value === 14) {
                straightFlushCards.push(hand[hand.findIndex(card => card.value === 14)]);
            }
            newHands = straightFlushCards;
        }
        return newHands;
    }

    computeHand(allcards: Array<Card>): HandValue {
        this.test_cache = {
            high_card: { suit: '', value: 0, kicker: { suit: '', value: 0 } },
            pair: { value: 0, index: -1 },
            two_pairs: {
                all_indices: [],
                pair_indices: []
            },
            three_of_a_kind: {
                value: 0,
                indices: []
            },
            four_of_a_kind: 0,
            straight: { result: false },
            flush: { result: false },
            straight_flush: false,
        };
        this.test_summary = {
            value: {},
            suit: {}
        }
        for (let i = 0; i < allcards.length; i++) {
            const suit = allcards[i].suit + '';
            const value = allcards[i].value;
            if (!this.test_summary.suit[suit])
                this.test_summary.suit[suit] = [i];
            else
                this.test_summary.suit[suit].push(i);
            if (!this.test_summary.value[value])
                this.test_summary.value[value] = [i];
            else
                this.test_summary.value[value].push(i);
        }
        const sorted_summary = this.TestSeries.map((t, i) => i == 0 ? t.fn.call(this, allcards) : (t.fn.call(this, allcards) ? (i + 14) : 0)).sort(VASC);
        const result = sorted_summary.pop();
        return {
            name: this.TestSeries[Math.max(result - 14, 0)].name,
            value: result
        };
    }
    compareHands(hands: Array<Array<Card>>, community: Array<Card>): Result {
        let bestHands: Array<Array<Card>> = [];
        let original_bestHandNames = [];
        // console.log("hands: ", JSON.stringify(hands));
        // console.log("community: ", JSON.stringify(community));
        for (let i = 0; i < hands.length; i++) {
            let hand = hands[i].concat(community);
            const bestHandName = this.computeHand(hand);
            original_bestHandNames.push(bestHandName.name);
            bestHands.push(this.updateBestHand(hand, bestHandName.name));
        }
        hands = bestHands;
        // console.log("best hands: ", JSON.stringify(hands));
        // if (hands[0].length != 5) {
        //     console.log("bug in compareHands, hands.length != 5");
        // }
        const ranks: Array<Rank> = hands.map((hand, index) => {
            return {
                ...this.computeHand(hand),
                index,
                cache: Object.assign({}, this.test_cache),
                hand
            };
        });
        // if (ranks[0].name != original_bestHandNames[0]) {
        //     console.log("ranks[0].name: ", ranks[0].name, "original_bestHandNames[0]: ", original_bestHandNames[0]);
        //     // throw new Error ("bug in compareHands, ranks[0].name != original_bestHandNames[0]")
        // }
        // if (ranks[1].name != original_bestHandNames[1]) {
        //     console.log("ranks[1].name: ", ranks[1].name, "original_bestHandNames[1]: ", original_bestHandNames[1]);
        //     // throw new Error ("bug in compareHands, ranks[1].name != original_bestHandNames[1]")
        // }
        ranks.sort(DESC);
        if (ranks[0].value > ranks[1].value) {
            const result: any = { type: "win", index: ranks[0].index, name: ranks[0].name };
            if (result.name == HAND_HIGHCARD) result.suit = ranks[0].cache.high_card.suit;
            return result;
        } else {
            const { name: highest_rank_name } = ranks[0];
            const conflict = TieBreaker[highest_rank_name](ranks.filter(r => r.name == highest_rank_name));
            const result: Result = {
                //test only the ranks same as highest rank
                ...conflict,
                //put the highest rank name
                name: highest_rank_name,
            };
            return result;
        }
    }
    /*computeHandAllPartialStat(hand:Array<Card>){
        let stat = {
            high_card:0,
            pair:0,
            two_pairs:0,
            three_of_a_kind:0,
            straight:0,
            flush:0,
            full_house:0,
            four_of_a_kind:0,
            straight_flush:0,
            royal_flush:0
        };
        let result = this.computeHand(hand,hand);
        
    }*/
    /** TODO
    Maximum number of raises
    Most fixed-limit games will not allow more than a predefined number of raises in a betting round.
    The maximum number of raises depends on the casino house rules, and is usually posted conspicuously
    in the card room. Typically, an initial bet plus either three or four raises are allowed.

    Consider this example in a $20/$40 game, with a posted limit of a bet and three raises.
    During a $20 round with three players, play could proceed as follows:

    Player A bets $20.
    Player B puts in another bet, raises another $20, making it $40 to play.
    Player C puts in a third bet, raising another $20 on that, thus making it $60 to play.
    Player A puts in the fourth bet (they are usually said to cap the betting).
    Once Player A has made their final bet, Players B and C may only call another two and one
    bets (respectively); they may not raise again because the betting is capped.

    A common exception in this rule practiced in some card rooms is to allow unlimited raising
    when a pot is played heads up (when only two players are in the hand at the start of the
    betting round). Usually, this has occurred because all other players have folded, and only
    two remain, although it is also practiced when only two players get dealt in. Many card rooms
    will permit these two players to continue re-raising each other until one player is all in.
    */
}