"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const mute_core_1 = require("mute-core");
const log_1 = require("./log");
const pb = require('./proto/message_pb.js');
class BotStorage {
    constructor(pseudonym, webChannel, mongooseAdapter) {
        this.pseudonym = pseudonym;
        this.joinSubject = new rxjs_1.Subject();
        this.messageSubject = new rxjs_1.ReplaySubject();
        this.peerJoinSubject = new rxjs_1.ReplaySubject();
        this.peerLeaveSubject = new rxjs_1.ReplaySubject();
        this.stateSubject = new rxjs_1.Subject();
        this.webChannel = webChannel;
        webChannel.onMessage = (id, bytes, isBroadcast) => {
            const msg = pb.Message.deserializeBinary(bytes);
            if (msg.getService() === 'botprotocol') {
                const docKey = pb.BotProtocol.deserializeBinary(msg.getContent()).getKey();
                this.mongooseAdapter.find(docKey)
                    .then((doc) => {
                    if (doc !== null) {
                        this.initMuteCore(docKey);
                        this.joinSubject.next(new mute_core_1.JoinEvent(this.webChannel.myId, docKey, false));
                        if (doc === null) {
                            log_1.log.info(`Document ${docKey} was not found in database, thus create a new document`);
                            this.stateSubject.next(new mute_core_1.State(new Map(), []));
                        }
                        else {
                            log_1.log.info(`Document ${docKey} retreived from database`);
                            this.stateSubject.next(new mute_core_1.State(new Map(), doc));
                        }
                    }
                })
                    .catch((err) => {
                    log_1.log.error(`Error when searching for the document ${docKey}`, err);
                });
                webChannel.onMessage = (id, bytes, isBroadcast) => {
                    const msg = pb.Message.deserializeBinary(bytes);
                    this.messageSubject.next(new mute_core_1.NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()));
                };
            }
            else {
                this.messageSubject.next(new mute_core_1.NetworkMessage(msg.getService(), id, isBroadcast, msg.getContent()));
            }
        };
        const msg = new pb.BotProtocol();
        msg.setKey('');
        webChannel.sendTo(webChannel.members[0], this.buildMessage({
            service: 'botprotocol',
            content: msg.serializeBinary()
        }));
        webChannel.onPeerJoin = (id) => this.peerJoinSubject.next(id);
        webChannel.onPeerLeave = (id) => this.peerLeaveSubject.next(id);
        this.mongooseAdapter = mongooseAdapter;
    }
    initMuteCore(docKey) {
        this.muteCore = new mute_core_1.MuteCore(42);
        this.muteCore.messageSource = this.messageSubject.asObservable();
        this.muteCore.onMsgToBroadcast.subscribe((bm) => {
            this.webChannel.send(this.buildMessage(bm));
        });
        this.muteCore.onMsgToSendRandomly.subscribe((srm) => {
            const index = Math.ceil(Math.random() * this.webChannel.members.length) - 1;
            this.webChannel.sendTo(this.webChannel.members[index], this.buildMessage(srm));
        });
        this.muteCore.onMsgToSendTo.subscribe((stm) => {
            this.webChannel.sendTo(stm.id, this.buildMessage(stm));
        });
        this.muteCore.collaboratorsService.peerJoinSource = this.peerJoinSubject.asObservable();
        this.muteCore.collaboratorsService.peerLeaveSource = this.peerLeaveSubject.asObservable();
        const pseudoSubject = new rxjs_1.BehaviorSubject(this.pseudonym);
        this.muteCore.collaboratorsService.pseudoSource = pseudoSubject.asObservable();
        this.muteCore.syncService.onState.subscribe((state) => {
            this.mongooseAdapter.save(docKey, state.richLogootSOps)
                .catch((err) => {
                log_1.log.error(`The document ${docKey} could not be saved into database`, err);
            });
        });
        this.muteCore.syncService.setJoinAndStateSources(this.joinSubject.asObservable(), this.stateSubject.asObservable());
    }
    buildMessage(msg) {
        const pbMsg = new pb.Message();
        pbMsg.setService(msg.service);
        pbMsg.setContent(msg.content);
        return pbMsg.serializeBinary();
    }
}
exports.BotStorage = BotStorage;
//# sourceMappingURL=BotStorage.js.map