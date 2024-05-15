import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
 

  appointment: Appointment = {
    id: 1,
    title: "Take the Dog for a walk",
    date: new Date('2024-05-15')
  };
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedAppoinments = localStorage.getItem("appointments");

    this.appointments = savedAppoinments? JSON.parse(savedAppoinments) : [];
  }

  addApointment(){

    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();
      // we can save upto 5mb data between sessions in local storage of the browser 
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  remove(index: number){
    this.appointments.splice(index,1);
    // save the data in local storage 
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }

}
