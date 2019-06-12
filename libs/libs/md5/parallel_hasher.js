(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/libs/md5/parallel_hasher.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '64508xvpPpO7KlT+kMF6Trh', 'parallel_hasher', __filename);
// libs/md5/parallel_hasher.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ParallelHasher = /** @class */ (function () {
    function ParallelHasher(workerUri) {
        this._queue = [];
        this._ready = true;
        var self = this;
        if (Worker) {
            self._hashWorker = new Worker(workerUri);
            self._hashWorker.onmessage = self._recievedMessage.bind(self);
            self._hashWorker.onerror = function (err) {
                self._ready = false;
                console.error('Hash worker failure', err);
            };
        }
        else {
            self._ready = false;
            console.error('Web Workers are not supported in this browser');
        }
    }
    ParallelHasher.prototype.hash = function (blob) {
        var self = this;
        var promise;
        promise = new Promise(function (resolve, reject) {
            self._queue.push({
                blob: blob,
                resolve: resolve,
                reject: reject,
            });
            self._processNext();
        });
        return promise;
    };
    ParallelHasher.prototype.terminate = function () {
        this._ready = false;
        this._hashWorker.terminate();
    };
    // Processes the next item in the queue
    ParallelHasher.prototype._processNext = function () {
        if (this._ready && !this._processing && this._queue.length > 0) {
            this._processing = this._queue.pop();
            this._hashWorker.postMessage(this._processing.blob);
        }
    };
    // Hash result is returned from the worker
    ParallelHasher.prototype._recievedMessage = function (evt) {
        var data = evt.data;
        if (data.success) {
            this._processing.resolve(data.result);
        }
        else {
            this._processing.reject(data.result);
        }
        this._processing = null;
        this._processNext();
    };
    return ParallelHasher;
}());
exports.ParallelHasher = ParallelHasher;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=parallel_hasher.js.map
        