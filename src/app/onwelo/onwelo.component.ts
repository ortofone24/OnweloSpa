import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnweloService } from '../services/onwelo.service';
import { createPerson, voterHasVoted } from '../interfaces/interface';

@Component({
  selector: 'app-onwelo',
  templateUrl: './onwelo.component.html',
  styleUrls: ['./onwelo.component.css']
})
export class OnweloComponent implements OnInit {

  addPerson!: FormGroup;
  voting!: FormGroup;
  getVoters: any;
  getCandidates: any;
  getVotersWhoNotVoted: any;

  constructor(private fb: FormBuilder, private apiService: OnweloService) {
    this.addPerson = this.fb.group({
      username: ['', [Validators.required]],
      isVoter: ['', [Validators.required]]
    })

    this.voting = this.fb.group({
      voter: ['', [Validators.required]],
      candidate: ['', [Validators.required]]
    })

    this.apiService.getAllVoters().subscribe(data => {
      //console.log(data)
      this.getVoters = data;
      //console.log(this.getVoters);
    }, error => console.error(error))

    this.apiService.getAllCandidates().subscribe(data => {
      //console.log(data)
      this.getCandidates = data;
      //console.log(this.getCandidates);
    }, error => console.error(error))

    this.apiService.getAllVotersWhoNotVoted().subscribe(data => {
      this.getVotersWhoNotVoted = data;
      console.log(this.getVotersWhoNotVoted);
    }, error => console.error(error))
  }

  //to think on change itd
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
    //console.log(this.addPerson.get('username'))
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
    //console.log('GosiaHanusia');

    //console.log(this.addPerson.value['isVoter']);

    let voter: boolean = false;
    var getVoter = this.addPerson.value['isVoter'];
    if (getVoter === '1') {
      voter = true;
    }

    let usernameFromForm : string  = this.addPerson.value['username'];

    let data: createPerson = {
      name: usernameFromForm,
      isVoter: voter
    }

    this.apiService.postCreatePerson(data).subscribe(data => {
      console.log(data)
    });
  }

  addVote() {

    let nameVoter: string = this.voting.value['voter'];
    let nameCandidate: string = this.voting.value['candidate'];
 
    //console.log(this.voting.value);

    let dataVoter: voterHasVoted = {
      name: nameVoter,
      voted: true
    }

    //console.log(dataVoter);
    //console.log(nameCandidate);

    this.apiService.putVoterHasVoted(dataVoter).subscribe(data => {
      console.log(data)
    })

    this.apiService.postIncrementVotesByOne(nameCandidate).subscribe(data =>
    {
      console.log(data);
    })
  }
}
