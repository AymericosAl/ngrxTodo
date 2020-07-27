@Injectable({
  providedIn: 'root'
})
export class TodosServices {
  constructor (private http: HttpClient) {}

  getAll() {
    //return this.http.get('/todos');
  }
}
