declare class SoundService {
    private bg;
    private match;
    private fail;
    private flip;
    private notMatch;
    private coutnDown;
    private congratulation;
    private bgcongratulation;
    constructor();
    playBackground(): void;
    stopBackground(): void;
    playMatch(): void;
    playFail(): void;
    playCongratulaions(): void;
    playBGCongratulaions(): void;
    playFlip(): void;
    playNotMatch(): void;
    countDown(): void;
}
declare const _default: SoundService;
export default _default;
//# sourceMappingURL=gameServices.d.ts.map