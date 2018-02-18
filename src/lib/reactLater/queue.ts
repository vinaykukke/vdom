import { IVdom } from 'Lib/types';

const queue = function() {
  this.items = [];
}

queue.prototype.enqueue = function(node: IVdom) {
  this.items.push(node);
}

queue.prototype.dequeue = function() {
  this.items.shift();
}

/**
 * @returns `true` if the items array on the `Queue` instance is empty
 */
queue.prototype.isEmpty = function(): boolean {
  return this.items.length === 0;
}

queue.prototype.emptyQueue = function() {
  this.items = [];
}

export default queue;