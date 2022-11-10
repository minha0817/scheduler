import React from "react";

import { 
  render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText
} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    });

    it("wait until the save operation is complete and then confirm that the student's name is showing", async () => {

      const { container } = render(<Application />);
  
      await waitForElement(() => getByText(container, "Archie Cohen"));
      
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
  
      fireEvent.click(getByAltText(appointment, "Add"));
  
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
  
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
      fireEvent.click(getByText(appointment, "Save")); //

      expect(getByText(appointment, "Saving...")).toBeInTheDocument(); 

      await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

      const day = getAllByTestId(container, "day").find(day => 
          queryByText(day, "Monday")
        )
      
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();

      });
      
      it("loads data, books an interview and reduces the spots remaining for Monday by 1", async() => {
        const { container } = render(<Application />)
        //wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText(container, "Archie Cohen"))

        const appointments = getAllByTestId(container, "appointment");
        const appointment = appointments[0];
        
        //Click the "Add" button on the first empty appointment.
        fireEvent.click(getByAltText(appointment, "Add")); 
        //Enter the name into the input with the placeholder
        fireEvent.change(getByPlaceholderText(appointment,  /Enter Student Name/i), {
          target: { value: "Lydia Miller-Jones"}
        })

        //Click the first interviewer in the list 
        fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

        //Click the "Save" button on that same appointment.
        fireEvent.click(getByText(appointment, "Save"))
        
        //Check that the element with the text "Saving" is displayed.
        expect(getByText(appointment, "Saving...")).toBeInTheDocument();

        //Wait until the element with the text "Lydia Miller-Jones" is displayed.
        await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))

        //Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
        const day = getAllByTestId(container, "day").find(day => 
            queryByText(day, "Monday")
          )
        expect(getByText(day, "no spots remaining")).toBeInTheDocument();

      })

      it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
        const { container, debug } = render(<Application />)
        await waitForElement(() => getByText(container, "Archie Cohen"))

        const appointment = getAllByTestId(container, "appointment").find(
          appointment => queryByText(appointment, "Archie Cohen")
        );

        fireEvent.click(getByAltText(appointment, "Delete"))

        expect(getByText(appointment, "Are you sure you want to cancel?")).toBeInTheDocument()

        fireEvent.click(getByText(appointment, "Confirm"))

        expect(getByText(appointment, "Deleting...")).toBeInTheDocument()

        await waitForElement(() => getByAltText(appointment, "Add"))
        
        const day = getAllByTestId(container, "day").find(day => 
          queryByText(day, "Monday")
        )
        expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

        debug()

      })

      it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
        const { container } = render(<Application />);

        await waitForElement(() => getByText(container, "Archie Cohen"));

        const appointment = getAllByTestId(container, "appointment").find(
          appointment => queryByText(appointment, "Archie Cohen")
        );
        
        fireEvent.click(queryByAltText(appointment, "Edit"));

        fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
          target: { value: "Lydia Miller-Jones" }
        });
        fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

        fireEvent.click(getByText(appointment, "Save"));

        expect(getByText(appointment, "Saving...")).toBeInTheDocument();

        await waitForElement(() => getByText(container, "Sylvia Palmer"))

        expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

        const day = getAllByTestId(container, "day").find(day => 
          queryByText(day, "Monday")
        );

        expect(getByText(day, "1 spot remaining"))
      })


})
