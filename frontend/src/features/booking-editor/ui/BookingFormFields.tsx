import { Controller, type Control } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  Label,
} from '@shared/ui';
import { format, startOfToday } from 'date-fns';
import { TIME_OPTIONS } from '@shared/config';
import type { BookingFormValues } from '@features/booking-editor';
import { ru } from 'date-fns/locale';

interface Properties {
  control: Control<BookingFormValues>;
}

export function BookingFormFields({ control }: Properties): React.JSX.Element {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Выберите дату</Label>

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger
                render={<Button id="date" variant="outline" className="justify-start m-0" />}
              >
                {field.value ? format(field.value, 'dd.MM.yyyy') : 'Выберите дату'}
              </PopoverTrigger>

              <PopoverContent className="w-auto">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  locale={ru}
                  fixedWeeks
                  disabled={{
                    before: startOfToday(),
                  }}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startTime">Время начала</Label>

        <Controller
          control={control}
          name="startTime"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="startTime">
                <SelectValue placeholder="Выберите время начала" />
              </SelectTrigger>

              <SelectContent className="p-2">
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="finishTime">Время окончания</Label>

        <Controller
          control={control}
          name="finishTime"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="finishTime">
                <SelectValue placeholder="Выберите время окончания" />
              </SelectTrigger>

              <SelectContent>
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}
