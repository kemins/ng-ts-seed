/// <reference path="../../../type-definitions/typings/tsd.d.ts"/>

namespace widgets {
    export interface IPopupWindow extends angular.ui.bootstrap.IModalSettings {
        useAnimation: boolean;
        okHandler?(): void;
        cancelHandler?(): void;
        finalHandler?(): void;
    }
}