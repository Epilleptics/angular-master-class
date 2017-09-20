import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from "../tab/tab.component";

@Component({
  selector: 'trm-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit  {

  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    this.select(this.tabs.first);
  }


  public select(tab: TabComponent) {
    const tabsArary = this.tabs.toArray();
    for(var i = 0, len = this.tabs.length; i < len; ++i) {
      tabsArary[i].selected = false;
    }
    tab.selected = true;
  }
}
