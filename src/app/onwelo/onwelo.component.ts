import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-onwelo',
  templateUrl: './onwelo.component.html',
  styleUrls: ['./onwelo.component.css']
})
export class OnweloComponent implements OnInit {

  addPerson!: FormGroup;
  voting!: FormGroup;

  constructor(private fb: FormBuilder)
  {
    this.addPerson = this.fb.group({
      username: ['', [Validators.required]],
      isVoter: ['', [Validators.required]]
    })

    this.voting = this.fb.group({
      voter: ['', [Validators.required]],
      candidate: ['', [Validators.required]]
     })
  }
  ngOnInit() {
      
  }

  isVoterOrCandidate(e: any) {
    this.isVoter?.setValue(e.target.value, {
      onlySelf: true,
      })
  }

  chooseVoter(e: any) {
    this.voter?.setValue(e.target.value, {
      onlySelf: true,
    })
  }

  chooseCandidate(e: any) {
    this.candidate?.setValue(e.target.value, {
      onlySelf: true,
    })
  }

  get username() {
    console.log(this.addPerson.get('username'))
    return this.addPerson.get('username')!;
  }

  get isVoter() {
    return this.addPerson.get('isVoter')!;
  }

  get voter() {
    return this.voting.get('voter')!;
  }

  get candidate() {
    return this.voting.get('candidate')!;
  }

  createPerson() {
    console.log('GosiaHanusia');
    console.log(this.addPerson);
    
  }

  addVote() {
    console.log('zxczxczx');
    console.log(this.voting.value);
  }

}