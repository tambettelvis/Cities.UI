import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {City} from "../../models/city";
import {FormBuilder, Validators} from "@angular/forms";
import {CityForm} from "../../models/forms/city.form";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cities-row',
  templateUrl: './cities-row.component.html',
  styleUrls: ['./cities-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesRowComponent implements OnChanges {

  @Input() city?: City;
  editMode = false;

  form = this.fb.group({
    name: ['', Validators.required],
    url: ['', Validators.required],
  });

  @Output() formSave = new EventEmitter<CityForm>();

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar
              ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.reset({
      name: this.city?.getName(),
      url: this.city?.getUrl(),
    });
  }

  submit(): void {
    if (this.form.valid && this.city) {

      const values = this.form.getRawValue();

      const name = this.city.getName() === values.name ? null : values.name;
      const url = this.city.getUrl() === values.url ? null : values.url;

      (name || url) && this.formSave.emit({
        id: this.city.getId() ?? 0,
        name: name,
        url: url,
      });

      this.editMode = false;

    } else {
      this.snackBar.open('Invalid form values', undefined, {
        duration: 2000,
      });
    }
  }
}
