import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnweloService } from '../services/onwelo.service';
import { NotifierService } from '../services/notifier.service';
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

  constructor(private fb: FormBuilder, private apiService: OnweloService, private toast: NotifierService) {
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
    this.apiService.getAllVoters().subscribe(data => {
      this.getVoters = data;
    }, error => console.error(error))

    this.apiService.getAllCandidates().subscribe(data => {
      this.getCandidates = data;
    }, error => console.error(error))

    this.apiService.getAllVotersWhoNotVoted().subscribe(data => {
      this.getVotersWhoNotVoted = data;
      if (this.getVotersWhoNotVoted < 1) {
        this.toast.showError();
      }
    }, error => console.error(error))
  }

  createPerson() {
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

    this.toast.showInfo();

    setTimeout(() => {
      this.reloadPage();
    },3000)
  }

  addVote() {
    let nameVoter: string = this.voting.value['voter'];
    let nameCandidate: string = this.voting.value['candidate'];

    let dataVoter: voterHasVoted = {
      name: nameVoter,
      voted: true
    };

    this.apiService.putVoterHasVoted(dataVoter).subscribe();

    this.apiService.postIncrementVotesByOne(nameCandidate).subscribe();

    this.toast.showSuccess();

    setTimeout(() => {
      this.reloadPage();
    }, 3000)
  }

  reloadPage() {
    window.location.reload();
  }

  get username() {
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
}
