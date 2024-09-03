/*
 * @Athour: kumozheng
 * @Date: 2021-08-31 15:56:47
 * @LastEditors: kumozheng
 * @LastEditTime: 2021-09-01 15:33:51
 * @Description: 
 * @FilePath: /RenderDemo copy/assets/Scripts/event/EventManager.ts
 */
import * as EventEmitter from 'eventemitter3';

class EventEmitterManager extends EventEmitter {
    public CharacterMove = 'MoveEvent';
    public CharacterMoveStop = 'MoveStop';
    public CameraRotateX = 'CameraRotateX';
    public CameraRotateY = 'CameraRotateY';
    public CameraRotate = 'CameraRotate';
    public SwitchView = 'SwitchView';
    public InvitePlayer = 'InvitePlayer';
    public RoomInfoChange = 'onRoomInfoChange';
    public AddPlayer = 'AddPlayer';

    public SendRoomId = 'SendRoomId';
    public CreateRoom = 'CreateRoom';

    constructor() {
        super();
    }
}

export const EventManager = new EventEmitterManager();
export default EventManager;