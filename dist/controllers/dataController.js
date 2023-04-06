var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
});
const index = (req, res) => {
    //
};
const download = (req, res) => {
    //
};
const destroy = (req, res) => {
    //
};
const searchTopFive = (req, res) => {
    //
};
const searchWord = (req, res) => {
    //
};
const searchWordCount = (req, res) => {
    //
};
const searchPageImage = (req, res) => {
    //
};
const searchSentences = (req, res) => {
    //
};
export { create, index, download, destroy, searchTopFive, searchWord, searchWordCount, searchPageImage, searchSentences };
//# sourceMappingURL=dataController.js.map