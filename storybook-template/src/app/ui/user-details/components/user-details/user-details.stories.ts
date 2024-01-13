
import { Meta, StoryObj } from '@storybook/angular';
import { UserDetailsComponent } from './user-details.component';
import { UiUserDetails } from './user-details.interface';

// story metadata config
const meta: Meta<UserDetailsComponent> ={
  title: "User/UserDetails",
  component: UserDetailsComponent,
  argTypes: {
    notificationCount: {
      options: [0, 1, 9, 15, 99, 123, 999, 2317],
      defaultValue: 0,
      control: { type: "radio" }
    }
  }
};
export default meta;

// mocks
const userMock: UiUserDetails = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@abc.efd",
  avatar: {
    url: "https://placehold.it/100x100",
    alt: "John Smith avatar"
  }
};

const userMock2: UiUserDetails = {
  firstName: "Wiliam",
  lastName: "Ferraciolli",
  email: "wiliam.ferreciolli@wiltech.com",
  avatar: {
    url: "https://placehold.it/100x100",
    alt: "Wiliam avatar"
  }
};


// stories
type UserDetailsStory = StoryObj<UserDetailsComponent>;

export const primary: UserDetailsStory = {
  args: {
    user: userMock,
    notificationCount: 100
  }
};

export const secondary: UserDetailsStory = {
  args: {
    user: userMock2
  }
};
