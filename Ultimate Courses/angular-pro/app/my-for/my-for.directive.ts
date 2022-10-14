import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor][myForOf]'
})
export class MyForDirective {

  @Input()
  set myForOf(collection) {

    // make sure that the view is cleared each time a change is detecte and it needs to rerender
    this.view.clear();

    collection.forEach((item, index) => {
      // create an embedded view to each item on the collection
      this.view.createEmbeddedView(this.template, {
        $implicit: item,
        index: index
      });
    });
  }

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

}
