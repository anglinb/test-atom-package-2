'use babel';

import TestAtomPackage2View from './test-atom-package-2-view';
import { CompositeDisposable } from 'atom';

export default {

  testAtomPackage2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testAtomPackage2View = new TestAtomPackage2View(state.testAtomPackage2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testAtomPackage2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-atom-package-2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testAtomPackage2View.destroy();
  },

  serialize() {
    return {
      testAtomPackage2ViewState: this.testAtomPackage2View.serialize()
    };
  },

  toggle() {
    console.log('TestAtomPackage2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
